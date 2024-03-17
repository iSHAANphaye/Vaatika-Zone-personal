import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import RetailerSideBar from "../components/RetailerSideBar";
import RetailerProducts from "../components/RetailerProducts";
import RetailerWishlist from "../components/RetailerWishlist";
import RetailerProfile from "../components/RetailerProfile";

const RetailerDashboard = () => {
  return (
    <div className="App">
      <RetailerSideBar />
      <div className="content">
        {/* Nested routes for retailer section */}
        <Routes>
          {/* Default route for /retailerdashboard */}
          <Route path="/" element={<Navigate to="allproducts" />} />
          {/* Route for RetailerProducts */}
          {/* <Route path="/allproducts" element={<RetailerProducts />} /> */}
          {/* Other routes */}
          <Route path="/wishlist" element={<RetailerWishlist />} />
          {/* <Route path="/profile" element={<RetailerProfile />} /> */}
        </Routes>
        <Outlet />
      </div>
    </div>
  );
};

export default RetailerDashboard;
