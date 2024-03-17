import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import { HiOutlineMail } from "react-icons/hi";
import {
  AiOutlineUnlock,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";

const AdminLoginPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate hook

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://vaatiika-zone-backend.onrender.com/api/adminLogin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        },
      );
      if (response.ok) {
        const data = await response.json();
        // Redirect based on selected user type
        const adminId = data.adminId;
        const adminName = data.adminName;
        const adminEmail = data.adminEmail;
        const adminPhone = data.adminPhone;
        const adminAddress = data.adminAddress;
        const adminPassword = data.adminPassword;
        const retailerCount = data.retailerCount;
        const farmerCount = data.farmerCount;
        const productCount = data.productCount;
        console.log("admin ID is", { adminId });
        console.log("farmer count is", { farmerCount });
        if (adminId) {
          // Store adminId in local storage for future use
          sessionStorage.setItem("adminId", adminId);
          sessionStorage.setItem("adminName", adminName);
          sessionStorage.setItem("adminEmail", adminEmail);
          sessionStorage.setItem("adminPhone", adminPhone);
          sessionStorage.setItem("adminAddress", adminAddress);
          sessionStorage.setItem("adminPassword", adminPassword);
          sessionStorage.setItem("retailerCount", retailerCount);
          sessionStorage.setItem("farmerCount", farmerCount);
          sessionStorage.setItem("productCount", productCount);
        }
        navigate("/adminlayout"); // Use navigate instead of history.push
      } else {
        console.error("Failed to login:", response.statusText);
        // Handle login failure (e.g., display error message)
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
    // Handle login error (e.g., display error message)
  };

  return (
    <div
      className="text-white h-screen flex justify-center items-center bg-cover"
      style={{ background: "url('../src/assets/cover" }}
    >
      <div className="bg-green-200 border rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-60 w-96 h-auto relative">
        <div className="text-4x1 text-black font-bold text-center mb-6">
          <h1 className="text-4xl mb-6">Admin</h1>
          <form onSubmit={handleLogin}>
            {" "}
            {/* Attach onSubmit event to handle login */}
            <div className="relative my-4 ">
              <input
                type="email"
                className="block w-full py-2.5 px-3 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-black focus:border-blue-600 peer"
                placeholder="Your Email"
                value={email}
                onChange={handleEmailChange}
              />
              <HiOutlineMail className="absolute top-3 right-3" />
            </div>
            <div className="relative my-4 ">
              <input
                type={passwordVisible ? "text" : "password"}
                className="block w-full py-2.5 px-3 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-black focus:border-blue-600 peer"
                placeholder="Your password"
                value={password}
                onChange={handlePasswordChange}
              />
              <span
                className="absolute top-3 right-3"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? (
                  <AiOutlineEyeInvisible className="text-xl text-gray-400 cursor-pointer" />
                ) : (
                  <AiOutlineEye className="text-xl text-gray-400 cursor-pointer" />
                )}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <input type="checkbox" name="" id="" />
                <label htmlFor="Remember me">Remember Me</label>
              </div>
            </div>
            <button
              className="w-full mt-6 rounded-full bg-emerald-500 text-white text-emerald-800 hover:bg-emerald-600 hover:text-white py-2 transition-colors duration-300"
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
