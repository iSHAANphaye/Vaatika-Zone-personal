import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../AdminRetailers.css";

const AdminRetailers = () => {
  const [retailers, setRetailers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchRetailers = async () => {
      try {
        const response = await fetch(
          "https://j37nyv-5000.csb.app/api/getAllRetailers",
        );
        if (response.ok) {
          const data = await response.json();
          setRetailers(data);
        } else {
          console.error("Failed to fetch retailers:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching retailers:", error);
      }
    };

    fetchRetailers();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filterRetailers = (retailers) => {
    if (!searchQuery) {
      return retailers;
    }
    return retailers.filter((retailer) =>
      retailer.username.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  };

  const filteredRetailers = filterRetailers(retailers);

  const handleSearch = () => {
    console.log("Search button clicked:", searchQuery);
    // You can further enhance this function to perform specific search actions
  };

  return (
    <div className="retailer-container">
      <h2>List of Retailers</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by username..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <table className="retailer-table">
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Username</th>
            <th>Email</th>
            <th>Mobile No.</th>
            <th>Address</th>
            <th>Retailer ID</th>
          </tr>
        </thead>
        <tbody>
          {filteredRetailers.map((retailer, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <Link to={`/adminlayout/retailerprofile/${retailer.id}`}>
                  {retailer.retailer_name}
                </Link>
              </td>
              <td>{retailer.email}</td>
              <td>{retailer.phone_number}</td>
              <td>{retailer.address}</td>
              <td>{retailer.retailer_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminRetailers;
