import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import AddBlog from "../pages/AddEditBlogPage/AddBlog";
import EditBlog from "../pages/AddEditBlogPage/EditBlog";
import SinglePageBlog from "../pages/SinglePageBlog/SinglePageBlog";
import PageNotFound from "../pages/PageNotFound";

const AdminRoute = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="add-blog" element={<AddBlog />} />
      <Route path="edit-blog/:blog_id" element={<EditBlog />} />
      <Route path="single-blog/:blog_id" element={<SinglePageBlog />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AdminRoute;
