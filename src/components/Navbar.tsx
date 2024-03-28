import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav>
        <div className="bg-slate-400 p-4">
          <ul className="flex gap-4">
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/add-blog"}>Add Blog</Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
