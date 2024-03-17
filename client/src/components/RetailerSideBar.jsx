import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom"; // Import useHistory hook
import { RetailerSideBarData } from "./RetailerSideBarData";
import { UserProfilePic, menu, close } from "../assets";
import { FiLogOut } from "react-icons/fi";

const RetailerSideBar = () => {
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Dummy user data (replace with actual user data)
  // const user = {
  //   username: "Utkarsh",
  //   //profileImage: "path_to_user_image.jpg" // URL of the user's profile image
  // };

  const handleLogout = () => {
    sessionStorage.removeItem("retailerId");
    sessionStorage.removeItem("retailerName");
    sessionStorage.removeItem("retailerEmail");
    sessionStorage.removeItem("retailerPhone");
    sessionStorage.removeItem("retailerAddress");
    sessionStorage.removeItem("retailerPassword");
    console.log("Logging out of retailer...");
    // Perform logout actions (e.g., clear user session, etc.)
    // Navigate to the home page
    navigate("/");
  };

  return (
    <div className="Sidebar">
      <ul className="SidebarList">
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain sidebar-menu-icon"
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
        ></div>
        {/* User info */}
        <li className="sidebar-user-info">
          <div className="sidebar-user-image">
            <img src={UserProfilePic} alt="User" />
          </div>
          <div className="sidebar-welcome-message">
            Welcome back, {sessionStorage.getItem("retailerName")}!
          </div>
        </li>
        {/* Sidebar links */}
        {RetailerSideBarData.map((val, key) => (
          <NavLink
            key={key}
            to={val.link}
            activeClassName="active"
            className="link"
          >
            <li className="row">
              <div id="icon">{val.icon}</div>
              <div id="title">{val.title}</div>
            </li>
          </NavLink>
        ))}
        {/* Logout button */}
        <li className="logout-button">
          {/* Render logout button for large screens */}
          <button className="hidden sm:block" onClick={handleLogout}>
            Logout
          </button>
          {/* Render logout icon for small screens */}
          <FiLogOut
            className="block sm:hidden sidebar-logout-icon"
            size={24}
            onClick={handleLogout}
          />
        </li>
      </ul>
    </div>
  );
};

export default RetailerSideBar;
