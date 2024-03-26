import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import AddBlog from "./components/AddBlog";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-blog" element={<AddBlog />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
