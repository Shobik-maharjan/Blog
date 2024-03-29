import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/AdminPage/Dashboard";

const AdminRoute = () => {
  return (
    <>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
    </>
  );
};

export default AdminRoute;
