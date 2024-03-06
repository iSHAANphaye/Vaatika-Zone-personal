import React from 'react';
import FarmerProducts from '../components/FarmerProducts';
import  AdminNewProduct  from '../components/AdminNewProduct';
import AdminProfile from '../components/AdminProfile';
import FarmerSideBar from '../components/FarmerSideBar';
import { Routes, Route, Outlet } from 'react-router-dom';

const FarmerDashboard = () => {
    return(
    <div className='App'>
    <FarmerSideBar/>
    <div className='content'>
      {/* Nested routes for admin section */}
      <Routes>
        <Route path="/farmerdashboard/products" element={<FarmerProducts />} />
        <Route path="/farmerdashboard/addproduct" element={<AdminNewProduct />} />
        <Route path="/farmerdashboard/profile" element={<AdminProfile/>}/>
      </Routes>
      <Outlet/>
    </div>
  </div> 
    );
}

export default FarmerDashboard

