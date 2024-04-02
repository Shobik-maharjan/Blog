import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="py-4 w-full">
        <div className="flex justify-between uppercase">
          <div className="logo text-xl">
            <Link to="/admin">Blog</Link>
          </div>
          <div className="flex gap-4">
            <Link to="/admin">Home</Link>
          </div>
          <div>
            <Link to="add-blog">Add Blog</Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
