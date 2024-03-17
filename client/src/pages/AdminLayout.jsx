import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import "../Sidebar.css";
import "../AdminDashboard.css";
import AdminProfile from "../components/AdminProfile";
import AdminDashboard from "../components/AdminDashboard";
import AdminProducts from "../components/AdminProducts";
import AdminRetailers from "../components/AdminRetailers";
import AdminFarmers from "../components/AdminFarmers";
import AdminNewProduct from "../components/AdminNewProduct";
import FarmerProfile from "../components/FarmerProfile";
import RetailerProfile from "../components/RetailerProfile";
import AdminProductDetails from "../components/AdminProductDetails";

const AdminLayout = () => {
  return (
    <div className="App">
      <SideBar />
      <div className="content">
        {/* Nested routes for admin section */}
        <Routes>
          {/* Default route for /adminlayout */}
          {/* <Route path="/" element={<AdminDashboard />} /> */}
          {/* Route for AdminDashboard */}
          <Route path="/dashboard" element={<AdminDashboard />} />
          {/* Other routes */}
          {/* <Route path="/addadminproduct" element={<AdminNewProduct />} /> */}
          {/* <Route path="/product/:productId" element={<AdminProductDetails />} />
          <Route path="/farmerprofile/:farmerId" element={<FarmerProfile />} />
          <Route
            path="/retailerprofile/:retailerId"
            element={<RetailerProfile />}
          /> */}
        </Routes>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
