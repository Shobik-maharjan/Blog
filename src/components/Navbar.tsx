import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="p-4 ">
        <div className="flex justify-between mx-4">
          <div className="logo">
            <Link to={"/"}>Blog</Link>
          </div>
          <ul className="flex gap-4">
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/contact"}>Contact</Link>
            </li>
          </ul>
          <div>
            <Link to={"/add-blog"}>Add Blog</Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
