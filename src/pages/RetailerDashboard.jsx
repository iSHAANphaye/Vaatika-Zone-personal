import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import RetailerSideBar from '../components/RetailerSideBar';
import RetailerProducts from '../components/RetailerProducts';
import RetailerWishlist from '../components/RetailerWishlist';
import AdminProfile from '../components/AdminProfile';

const RetailerDashboard = () => {
  return (
    <div className='App'>
    <RetailerSideBar/>
    <div className='content'>
      {/* Nested routes for admin section */}
      <Routes>
        <Route path="/retailerdashboard/allproducts" element={<RetailerProducts />} />
        <Route path="/retailerdashboard/wishlist" element={<RetailerWishlist />} />
        <Route path="/retailerdashboard/profile" element={<AdminProfile/>}/>
      </Routes>
      <Outlet/>
    </div>
  </div> 
  )
}

export default RetailerDashboard
