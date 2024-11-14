import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoWarning } from "react-icons/io5";
import { SiTicktick } from "react-icons/si";
import { Link } from "react-router-dom";
import { auth } from "../_firebase_";
export default function Login() {
  const [errMessage, setErrMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const emailRef = useRef();
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const validation =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!validation.test(password)) {
      setErrMessage(
        "Must be at least 6 characters including upper-lower case, number, and special character"
      );
      return;
    }

    setErrMessage("");
    setSuccess(false);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        if (!user.emailVerified) {
          setErrMessage("Please Verify Your Email!");
        } else {
          setSuccess(true);
        }

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(error.message);
        const errorMessage = error.message.split("auth/")[1];
        const displayError = errorMessage.split(").")[0];
        setErrMessage(displayError);
        setSuccess(false);
      });
  };
  const handleShow = () => {
    setIsShow(!isShow);
  };
  const handleForgotPass = () => {
    const email = emailRef.current.value;
    sendPasswordResetEmail(auth, email).then(() => {
      alert("Reset Password Email sent");
    });
  };
  return (
    <>
      <div className="hero">
        <div className="hero-content flex-col lg:flex-row-reverse py-12">
          <div className="card bg-base-100 border border-gray-600 w-full max-w-sm shrink-0 shadow-md shadow-green-700">
            {success && (
              <span className="text-base text-green-500 flex items-center gap-2 justify-center pt-5 font-bold italic">
                <SiTicktick className="text-lg" />{" "}
                <span>Login Successfully!</span>
              </span>
            )}
            <div>
              <h1 className="text-center text-2xl font-bold text-green-500 pt-5">
                Login
              </h1>
            </div>
            <form className="card-body gap-8" onSubmit={handleLogin}>
              <div>
                <label className="input input-bordered flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70"
                  >
                    <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                    <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                  </svg>
                  <input
                    type="email"
                    name="email"
                    className="grow"
                    placeholder="Email"
                    ref={emailRef}
                  />
                </label>
              </div>
              <div>
                <label className="input input-bordered flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <input
                    type={isShow ? "text" : "password"}
                    name="password"
                    className="grow"
                    placeholder="password"
                  />
                  {isShow ? (
                    <FaEyeSlash onClick={handleShow} />
                  ) : (
                    <FaEye onClick={handleShow} />
                  )}
                </label>
                <label className="label" onClick={handleForgotPass}>
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control">
                <button className="btn btn-success">Login</button>
                <div className="flex items-center justify-start text-xs py-3">
                  <p className="">Didn't have an account?</p>
                  <Link
                    to="/register"
                    className="text-green-500 font-bold underline"
                  >
                    Register
                  </Link>
                </div>
                {errMessage && (
                  <span className="text-xs text-yellow-500 py-2 flex items-center gap-1">
                    <IoWarning className="text-lg" /> {errMessage}
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
