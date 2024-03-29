import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const AdminLayout = () => {
  return (
    <div className="bg-neutral-300">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default AdminLayout;
