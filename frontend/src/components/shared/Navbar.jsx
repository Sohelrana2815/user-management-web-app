import { Link, NavLink } from "react-router";
import LogoutButton from "../auth/LogoutButton";
import { MdMenu } from "react-icons/md";

const Navbar = () => {
  const navLinks = (
    <>
      <li>
        <NavLink to="/">Login</NavLink>
      </li>
      <li>
        <NavLink to="/registration">Register</NavLink>
      </li>
      <li>
        <NavLink to="/adminPanel">Manage Users</NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <p tabIndex={0} role="" className="lg:hidden">
            <MdMenu />
          </p>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {navLinks}
          </ul>
        </div>
        <Link to="/">
          <p className="pl-2 lg:text-xl text-xs font-mono">
            User Management App
          </p>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>
      <div className="navbar-end">
        <LogoutButton />
      </div>
    </div>
  );
};

export default Navbar;
