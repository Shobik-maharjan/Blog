import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="py-4 w-full">
        <div className="flex justify-between">
          <div className="logo">
            <Link to="/blog">Blog</Link>
          </div>
          <ul className="flex gap-4">
            <li>
              <Link to="/blog">Home</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
          <div>
            <Link to="/blog/add-blog">Add Blog</Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
