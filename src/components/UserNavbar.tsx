import { Link } from "react-router-dom";

const UserNavbar = () => {
  return (
    <>
      <nav className="py-4 w-full">
        <div className="flex justify-between uppercase">
          <div className="logo text-xl">
            <Link to="/">Blog</Link>
          </div>
          <ul className="flex gap-8">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default UserNavbar;
