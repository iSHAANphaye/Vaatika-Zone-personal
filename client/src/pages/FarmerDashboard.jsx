import React from "react";
import FarmerProducts from "../components/FarmerProducts";
import FarmerNewProduct from "../components/FarmerNewProduct";
import FarmerProfile from "../components/FarmerProfile";
import FarmerSideBar from "../components/FarmerSideBar";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import FarmerProductDetails from "../components/FarmerProductDetails";

const FarmerDashboard = () => {
  return (
    <div className="App">
      <FarmerSideBar />
      <div className="content">
        {/* Nested routes for admin section */}
        <Routes>
          {/* Default route for /farmerdashboard */}
          <Route path="/" element={<Navigate to="products" />} />
          {/* Route for FarmerProducts */}
          {/* <Route path="/products" element={<FarmerProducts />} /> */}
          {/* Other routes */}
          {/* <Route path="/addfarmerproduct" element={<FarmerNewProduct />} /> */}
          <Route path="/profile" element={<FarmerProfile />} />
          <Route
            path="/farmerproductdetails/:productId"
            element={<FarmerProductDetails />}
          />
        </Routes>
        <Outlet />
      </div>
    </div>
  );
};

export default FarmerDashboard;
