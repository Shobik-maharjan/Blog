import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const ClinetLayout = () => {
  return (
    <div className="w-10/12 mx-auto h-screen flex items-start flex-col">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default ClinetLayout;
