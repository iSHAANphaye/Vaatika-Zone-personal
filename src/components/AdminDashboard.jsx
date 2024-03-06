import React from 'react';
import '../Sidebar.css';
import '../AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="dashboard-container">
      {/* First flexbox container */}
      <div className="dashboard-item">
        <h3>Total Products</h3>
        <p>245</p>
      </div>
      
      {/* Second flexbox container */}
      <div className="dashboard-item">
        <h3>Total Retailers</h3>
        <p>233</p>
      </div>
      
      {/* Third flexbox container */}
      <div className="dashboard-item">
        <h3>Total Farmers</h3>
        <p>87</p>
      </div>
    </div>
  );
}

export default AdminDashboard;
