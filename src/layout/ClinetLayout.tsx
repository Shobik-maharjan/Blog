import UserNavbar from "src/components/UserNavbar";
import { Outlet } from "react-router-dom";
import Footer from "src/components/Footer";

const ClinetLayout = () => {
  return (
    <div>
      <div className="w-8/12 mx-auto flex items-start flex-col">
        <UserNavbar />
        <Outlet />
      </div>
      <div className="bg-slate-100 sticky">
        <Footer />
      </div>
    </div>
  );
};

export default ClinetLayout;
