import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoWarning } from "react-icons/io5";
import { SiTicktick } from "react-icons/si";
import { Link } from "react-router-dom";
import { auth } from "../_firebase_";

export default function Register() {
  const [errMessage, setErrMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const terms = e.target.terms.checked;
    if (!terms) {
      setErrMessage("accept the terms & conditions");
      return;
    }

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

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        sendEmailVerification(auth.currentUser).then(() => {
          console.log("Verification email sent!");
        });
        setSuccess(true);
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
  return (
    <>
      <div className="hero">
        <div className="hero-content flex-col lg:flex-row-reverse py-12">
          <div className="card bg-base-100 border border-gray-600 w-full max-w-sm shrink-0 shadow-md shadow-green-700">
            {success && (
              <span className="text-base text-green-500 flex items-center gap-2 justify-center pt-5 font-bold italic">
                <SiTicktick className="text-lg" />{" "}
                <span>Successfully Registered!</span>
              </span>
            )}
            <div>
              <h1 className="text-center text-2xl font-bold text-green-500 pt-5">
                Create an Account
              </h1>
            </div>
            <form className="card-body gap-8" onSubmit={handleSubmit}>
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
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" name="terms" className="checkbox" />
                <p className="text-sm">I accept the Terms and Conditions</p>
              </div>
              <div className="form-control mt-3">
                <button className="btn btn-success">Register</button>
                <div className="flex items-center justify-start text-xs py-3">
                  <p className="">Already have an account?</p>
                  <Link
                    to="/login"
                    className="text-green-500 font-bold underline"
                  >
                    Log In
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
