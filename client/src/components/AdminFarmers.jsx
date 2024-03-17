import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../AdminFarmers.css"; // Import CSS file for styling

const AdminFarmers = () => {
  const [farmers, setFarmers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFarmers, setFilteredFarmers] = useState([]);

  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        const response = await fetch(
          "https://j37nyv-5000.csb.app/api/getAllFarmers",
        );
        if (response.ok) {
          const data = await response.json();
          setFarmers(data);
        } else {
          console.error("Failed to fetch farmers:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching farmers:", error);
      }
    };

    fetchFarmers();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    const filtered = farmers.filter(
      (farmer) =>
        farmer.farmer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        farmer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        farmer.phone_number.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setFilteredFarmers(filtered);
  };

  return (
    <div className="farmers-container">
      <h2>List of Farmers</h2>
      <div className="search-box-container">
        <input
          type="text"
          placeholder="Search by username, email, or mobile number..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-box"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>
      <table className="farmers-table">
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Username</th>
            <th>Email</th>
            <th>Mobile No.</th>
            <th>Total Products</th>
            <th>Address</th>
            <th>Farmer ID</th>
          </tr>
        </thead>
        <tbody>
          {(filteredFarmers.length ? filteredFarmers : farmers).map(
            (farmer, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <Link to={`/adminlayout/farmerprofile/${farmer.id}`}>
                    {farmer.farmer_name}
                  </Link>
                </td>
                <td>{farmer.email}</td>
                <td>{farmer.phone_number}</td>
                <td>{farmer.product_count}</td>
                <td>{farmer.address}</td>
                <td>{farmer.farmer_id}</td>
              </tr>
            ),
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminFarmers;
