import { useState } from "react";
import { close, logo1, menu } from "../assets";
import { navLinks } from "../constants";
//import SignInPage from "./SignInPage";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);

  return (
    <nav className="w-full flex py-6 justify-between items-center navbar">
      <img
        src={logo1}
        alt="Vaatiika Zone"
        className="w-[170px] h-[160px]  logo"
      />

      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        {navLinks.map((nav, index) => (
          <li
            key={nav.id}
            className={`font-poppins font-normal cursor-pointer text-[16px] ${
              active === nav.title ? "text-black" : "text-black"
            } ${index === navLinks.length - 1 ? "mr-6" : "mr-10"}`}
            onClick={() => setActive(nav.title)}
          >
            <a href={`#${nav.id}`}>{nav.title}</a>
          </li>
        ))}
        {/* Sign-in button */}

        <Link to="/signinpage">
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4">
            Sign In
          </button>
        </Link>

        {/* Admin button */}
        <Link to="/adminloginpage">
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4">
            Admin
          </button>
        </Link>
      </ul>

      <div className="sm:hidden flex flex-1 justify-end items-center">
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain menu-icon"
          onClick={() => {
            console.log("Toggle state before click:", toggle);
            setToggle(!toggle);
            console.log("Toggle state after click:", !toggle);
          }}
        />

        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } p-6 bg-gray absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl rsidebar`}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            {navLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-poppins font-medium cursor-pointer text-[16px] ${
                  active === nav.title ? "text-black" : "text-black"
                } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                onClick={() => setActive(nav.title)}
              >
                <a href={`#${nav.id}`}>{nav.title}</a>
              </li>
            ))}
            <Link to="/signinpage">
              <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4">
                Sign In
              </button>
            </Link>

            {/* Admin button */}
            <Link to="/adminloginpage">
              <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4">
                Admin
              </button>
            </Link>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
