import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const AdminLayout = () => {
  return (
    <div className="w-10/12 mx-auto h-screen flex items-start flex-col">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default AdminLayout;
