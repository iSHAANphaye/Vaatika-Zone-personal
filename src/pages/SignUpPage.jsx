import React, { useState } from 'react';
import { BiUser } from "react-icons/bi";
import { AiOutlineUnlock, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [userType, setUserType] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleUserTypeChange = (type) => {
    setUserType(type);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userType) {
      alert('Please select your user type.');
      return;
    }
    // Redirect based on selected user type
    if (userType === "farmer") {
      navigate("/farmerdashboard");
    } else if (userType === "retailer") {
      navigate("/retailerdashboard");
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <div className='text-white h-screen flex justify-center items-center' style={{ backgroundColor: "#F4FCF9" }}>
      <div className='bg-green-200 border rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-60 w-96 h-auto relative'>
        <div className='text-5x1 text-black font-bold text-center mb-6'>
          <h1 className="text-4xl mb-6">Let's get started</h1>
          <form onSubmit={handleSubmit}>
            <div className='relative my-4'>
              <input type="username" required className='block w-full py-2.5 px-3 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-black focus:border-blue-600 peer' placeholder='Username' />
              <BiUser className='absolute top-3 right-3' />
            </div>
            <div className='relative my-4'>
              <input type="email" required className='block w-full py-2.5 px-3 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-black focus:border-blue-600 peer' placeholder='Email' />
              <HiOutlineMail className='absolute top-3 right-3' />
            </div>
            <div className='relative my-4'>
              <input type="tel" required className='block w-full py-2.5 px-3 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-black focus:border-blue-600 peer' placeholder='Mobile number' />
            </div>
            <div className='relative my-4'>
              <input type={passwordVisible ? "text" : "password"} required className='block w-full py-2.5 px-3 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-black focus:border-blue-600 peer' placeholder='Password' />
              <span className="absolute top-3 right-3" onClick={togglePasswordVisibility}>
                {passwordVisible ? <AiOutlineEyeInvisible className="text-xl text-gray-400 cursor-pointer" /> : <AiOutlineEye className="text-xl text-gray-400 cursor-pointer" />}
              </span>
            </div>
            <div className='relative my-4'>
              <input type={confirmPasswordVisible ? "text" : "password"} required className='block w-full py-2.5 px-3 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-black focus:border-blue-600 peer' placeholder='Confirm password' />
              <span className="absolute top-3 right-3" onClick={toggleConfirmPasswordVisibility}>
                {confirmPasswordVisible ? <AiOutlineEyeInvisible className="text-xl text-gray-400 cursor-pointer" /> : <AiOutlineEye className="text-xl text-gray-400 cursor-pointer" />}
              </span>
            </div>
            <div className='relative my-4'>
              <p className='text-gray-700 mb-2'>User Type?</p>
              <label className="inline-flex items-center">
                <input type="radio" className="form-radio" name="userType" value="farmer" required checked={userType === "farmer"} onChange={() => handleUserTypeChange("farmer")} />
                <span className="ml-2">Farmer</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input type="radio" className="form-radio" name="userType" value="retailer" required checked={userType === "retailer"} onChange={() => handleUserTypeChange("retailer")} />
                <span className="ml-2">Retailer</span>
              </label>
            </div>
            <button className='w-full mt-6 rounded-full bg-emerald-500 text-white hover:bg-emerald-600 hover:text-white py-2 transition-colors duration-300' type="submit">Sign Up</button>
            <div>
              <span className='m-2'>Already have an Account?<Link className='text-blue-500' to='/signinpage'>Login</Link></span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage;