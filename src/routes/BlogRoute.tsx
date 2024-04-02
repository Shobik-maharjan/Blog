import { Route, Routes } from "react-router-dom";
import SinglePageBlog from "../pages/SinglePageBlog/SinglePageBlog";
import PageNotFound from "../pages/PageNotFound";
import UserHome from "src/pages/Home/UserHome";
import Contact from "src/pages/contact/Contact";

const BlogRoute = () => {
  return (
    <Routes>
      <Route index element={<UserHome />} />
      <Route path="single-blog/:blog_id" element={<SinglePageBlog />} />
      <Route path="contact/*" element={<Contact />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default BlogRoute;
