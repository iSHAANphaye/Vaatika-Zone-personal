import React, { useState } from 'react';
import retailersData from './farmersData'; // Assuming you have a separate dataset for retailers
import '../AdminRetailers.css'; 

const AdminRetailers = () => {
  const [searchQuery, setSearchQuery] = useState(''); // State to track search query
  const sortedRetailers = retailersData.sort((a, b) => a.username.localeCompare(b.username));

  // Function to handle search query change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Function to filter retailers based on search query
  const filterRetailers = (retailers) => {
    if (!searchQuery) {
      return retailers;
    }
    return retailers.filter(retailer => retailer.username.toLowerCase().includes(searchQuery.toLowerCase()));
  };

  // Filtered retailers based on search query
  const filteredRetailers = filterRetailers(sortedRetailers);

  // Function to handle search action
  const handleSearch = () => {
    // Perform search action here
    console.log('Search button clicked:', searchQuery);
  };

  return (
    <div className="retailer-container">
      <h2>List of Retailers</h2>
      {/* Search bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by username..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button onClick={handleSearch}>Search</button> {/* Search button */}
      </div>
      {/* Retailer table */}
      <table className="retailer-table">
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Username</th>
            <th>Email</th>
            <th>Mobile No.</th>
          </tr>
        </thead>
        <tbody>
          {filteredRetailers.map((retailer, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{retailer.username}</td>
              <td>{retailer.email}</td>
              <td>{retailer.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminRetailers;
