import React from 'react';
import FarmerProducts from '../components/FarmerProducts';
import AdminNewProduct from '../components/AdminNewProduct';
import AdminProfile from '../components/AdminProfile';
import FarmerSideBar from '../components/FarmerSideBar';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';

const FarmerDashboard = () => {
  return (
    <div className='App'>
      <FarmerSideBar />
      <div className='content'>
        {/* Nested routes for admin section */}
        <Routes>
          {/* Default route for /farmerdashboard */}
          <Route path="/" element={<Navigate to="products" />} />
          {/* Route for FarmerProducts */}
          <Route path="/products" element={<FarmerProducts />} />
          {/* Other routes */}
          <Route path="/addproduct" element={<AdminNewProduct />} />
          <Route path="/profile" element={<AdminProfile />} />
        </Routes>
        <Outlet/>
      </div>
    </div>
  );
}

export default FarmerDashboard;
