import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import AddBlog from "./components/AddBlog";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditBlog from "./components/EditBlog";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-blog" element={<AddBlog />} />
          <Route path="/edit-blog/:blog_id" element={<EditBlog />} />
        </Routes>
        <ToastContainer closeOnClick />
      </BrowserRouter>
    </>
  );
};

export default App;
