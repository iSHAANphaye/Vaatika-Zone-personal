import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
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
          <Route path="/adminlayout/dashboard" element={<AdminDashboard />} />
          <Route path="/adminlayout/products" element={<AdminProducts />} />
          <Route path="/adminlayout/retailerdata" element={<AdminRetailers />} />
          <Route path="/adminlayout/farmerdata" element={<AdminFarmers />} />
          <Route path="/adminlayout/addproduct" element={<AdminNewProduct />} />
          <Route path="/adminlayout/profile" element={<AdminProfile/>}/>
        </Routes>
        <Outlet/>
        
      </div>
    </div> 
  );
}

export default AdminLayout;
