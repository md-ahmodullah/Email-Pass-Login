import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-420px)] my-12 w-11/12 md:w-10/12 mx-auto">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
