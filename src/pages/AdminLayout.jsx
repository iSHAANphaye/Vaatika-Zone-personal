import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import SideBar from '../components/SideBar';
import '../Sidebar.css';
import '../AdminDashboard.css';
import AdminProfile from '../components/AdminProfile';
import AdminDashboard from '../components/AdminDashboard';
import AdminProducts from '../components/AdminProducts';
import AdminRetailers from '../components/AdminRetailers';
import AdminFarmers from '../components/AdminFarmers';
import AdminNewProduct from '../components/AdminNewProduct';

const AdminLayout = () => {
  return (
    <div className='App'>
      <SideBar/>
      <div className='content'>
        {/* Nested routes for admin section */}
        <Routes>
          {/* Default route for /adminlayout */}
          <Route path="/" element={<Navigate to="dashboard" />} />
          {/* Route for AdminDashboard */}
          <Route path="/dashboard" element={<AdminDashboard />} />
          {/* Other routes */}
          <Route path="/products" element={<AdminProducts />} />
          <Route path="/retailerdata" element={<AdminRetailers />} />
          <Route path="/farmerdata" element={<AdminFarmers />} />
          <Route path="/addproduct" element={<AdminNewProduct />} />
          <Route path="/profile" element={<AdminProfile />} />
        </Routes>
        <Outlet/>
      </div>
    </div> 
  );
}

export default AdminLayout;
