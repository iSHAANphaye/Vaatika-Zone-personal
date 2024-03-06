import React, { useState } from 'react';
import farmersData from './farmersData';
import '../AdminFarmers.css'; // Import CSS file for styling

const AdminFarmers = () => {
  // State to manage the search query
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFarmers, setFilteredFarmers] = useState([]); // State to store filtered farmers

  // Sorting farmers alphabetically by username
  const sortedFarmers = farmersData.sort((a, b) => a.username.localeCompare(b.username));

  // Function to handle search query change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Function to handle search action
  const handleSearch = () => {
    const filtered = sortedFarmers.filter(farmer =>
      farmer.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      farmer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      farmer.phone.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredFarmers(filtered);
  };

  // Function to calculate total number of products for a farmer
  const calculateTotalProducts = (farmer) => {
    let totalProducts = 0;
    farmer.products.forEach(product => {
      totalProducts += product.quantity;
    });
    return totalProducts;
  };

  return (
    <div className="farmers-container">
      <h2>List of Farmers</h2>
      {/* Search box */}
      <div className="search-box-container">
        <input
          type="text"
          placeholder="Search by username, email, or mobile number..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-box"
        />
        <button onClick={handleSearch} className="search-button">Search</button>
      </div>
      {/* Table */}
      <table className="farmers-table">
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Username</th>
            <th>Email</th>
            <th>Mobile No.</th>
            <th>Total Products</th>
          </tr>
        </thead>
        <tbody>
          {(filteredFarmers.length ? filteredFarmers : sortedFarmers).map((farmer, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{farmer.username}</td>
              <td>{farmer.email}</td>
              <td>{farmer.phone}</td>
              <td>{calculateTotalProducts(farmer)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminFarmers;


// Function to calculate total number of products for a farmer
const calculateTotalProducts = (farmer) => {
  let totalProducts = 0;
  farmer.products.forEach(product => {
    totalProducts += product.quantity;
  });
  return totalProducts;
};
