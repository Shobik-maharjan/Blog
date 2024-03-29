import { BrowserRouter, Route, Routes } from "react-router-dom";
import ClinetLayout from "../layout/ClinetLayout";
import BlogRoute from "./BlogRoute";
import { ToastContainer } from "react-toastify";
import AdminLayout from "../layout/AdminLayout";
import AdminRoute from "./AdminRoute";

const MainRoute = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ClinetLayout />}>
            <Route path="blog/*" element={<BlogRoute />} />
            <Route path="contact/*" element={<p>On Contact</p>} />
          </Route>

          <Route path="admin/*" element={<AdminLayout />}>
            <Route path="*" element={<AdminRoute />} />
          </Route>

          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
        <ToastContainer closeOnClick />
      </BrowserRouter>
    </>
  );
};

export default MainRoute;
