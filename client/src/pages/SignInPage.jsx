import React, { useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import {
  AiOutlineUnlock,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

const SignInPage = () => {
  const [userType, setUserType] = useState(null);
  const [passwordShown, setPasswordShown] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleUserTypeChange = (type) => {
    setUserType(type);
  };

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userType) {
      alert("Please select your user type.");
      return;
    }

    try {
      const response = await fetch(
        "https://vaatiika-zone-backend.onrender.com/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password, userType }),
        },
      );

      if (response.ok) {
        const data = await response.json();
        // Redirect based on selected user type
        if (userType === "farmer") {
          const farmerId = data.farmerId;
          const farmerName = data.farmerName;
          const farmerEmail = data.farmerEmail;
          const farmerPhone = data.farmerPhone;
          const farmerAddress = data.farmerAddress;
          const farmerPassword = data.farmerPassword;
          console.log("farmer ID is", { farmerId });
          if (farmerId) {
            // Store farmerId in local storage for future use
            sessionStorage.setItem("farmerId", farmerId);
            sessionStorage.setItem("farmerName", farmerName);
            sessionStorage.setItem("farmerEmail", farmerEmail);
            sessionStorage.setItem("farmerPhone", farmerPhone);
            sessionStorage.setItem("farmerAddress", farmerAddress);
            sessionStorage.setItem("farmerPassword", farmerPassword);
          }
          navigate("/farmerdashboard");
        } else if (userType === "retailer") {
          const retailerId = data.retailerId;
          const retailerName = data.retailerName;
          const retailerEmail = data.retailerEmail;
          const retailerPhone = data.retailerPhone;
          const retailerAddress = data.retailerAddress;
          const retailerPassword = data.retailerPassword;
          console.log("retailer ID is", { retailerId });
          if (retailerId) {
            // Store retailerId in local storage for future use
            sessionStorage.setItem("retailerId", retailerId);
            sessionStorage.setItem("retailerName", retailerName);
            sessionStorage.setItem("retailerEmail", retailerEmail);
            sessionStorage.setItem("retailerPhone", retailerPhone);
            sessionStorage.setItem("retailerAddress", retailerAddress);
            sessionStorage.setItem("retailerPassword", retailerPassword);
          }
          navigate("/retailerdashboard");
        }
      } else {
        console.error("Failed to login:", response.statusText);
        // Handle login failure (e.g., display error message)
      }
    } catch (error) {
      console.error("Error during login:", error);
      // Handle login error (e.g., display error message)
    }
  };

  return (
    <div
      className="text-white h-screen flex justify-center items-center"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <div className="bg-green-200 border rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-60 w-96 h-auto relative">
        <div className="text-4x1 text-black font-bold text-center mb-6">
          <h1 className="text-4xl mb-6">Welcome Back!</h1>
          <form onSubmit={handleSubmit}>
            <div className="relative my-4">
              <input
                type="email"
                className="block w-full py-2.5 px-3 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-black focus:border-blue-600 peer"
                placeholder="Your Email"
                value={email}
                onChange={handleEmailChange}
              />
              <HiOutlineMail className="absolute top-3 right-3 text-xl text-gray-400" />
            </div>
            <div className="relative my-4">
              <input
                type={passwordShown ? "text" : "password"}
                className="block w-full py-2.5 px-3 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-black focus:border-blue-600 peer"
                placeholder="Your Password"
                value={password}
                onChange={handlePasswordChange}
              />
              <AiOutlineUnlock className="absolute top-3 right-3 text-xl text-gray-400" />
              <div className="absolute top-3 right-10">
                {passwordShown ? (
                  <AiOutlineEyeInvisible
                    onClick={togglePasswordVisibility}
                    className="text-gray-400 cursor-pointer"
                  />
                ) : (
                  <AiOutlineEye
                    onClick={togglePasswordVisibility}
                    className="text-gray-400 cursor-pointer"
                  />
                )}
              </div>
            </div>
            <div className="flex justify-between items-center mb-4">
              <div className="flex gap-2 items-center">
                <input
                  type="radio"
                  name="userType"
                  id="farmer"
                  className="text-emerald-500 focus:ring-emerald-500"
                  value="farmer"
                  checked={userType === "farmer"}
                  onChange={() => handleUserTypeChange("farmer")}
                />
                <label htmlFor="farmer" className="text-gray-500">
                  Farmer
                </label>
                <input
                  type="radio"
                  name="userType"
                  id="retailer"
                  className="text-emerald-500 focus:ring-emerald-500"
                  value="retailer"
                  checked={userType === "retailer"}
                  onChange={() => handleUserTypeChange("retailer")}
                />
                <label htmlFor="retailer" className="text-gray-500">
                  Retailer
                </label>
              </div>
            </div>
            <div className="flex justify-between items-center mb-4">
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  name="rememberMe"
                  id="rememberMe"
                  className="text-emerald-500 focus:ring-emerald-500"
                />
                <label htmlFor="rememberMe" className="text-gray-500">
                  Remember Me
                </label>
              </div>
              <Link
                to="/forgotpassword"
                className="text-emerald-500 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <button
              className="w-full mt-6 rounded-full bg-emerald-500 hover:bg-emerald-600 hover:text-white py-2 transition-colors duration-300 text-white font-semibold focus:outline-none focus:ring focus:ring-emerald-500 focus:ring-opacity-50"
              type="submit"
            >
              Login
            </button>
            <div>
              <span className="mt-4 text-gray-500">
                New Here?{" "}
                <Link
                  className="text-blue-500 hover:underline"
                  to="/signuppage"
                >
                  Create an Account
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
