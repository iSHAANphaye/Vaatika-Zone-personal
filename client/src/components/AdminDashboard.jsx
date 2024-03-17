import React, { useState, useEffect, useMemo } from "react";
import "../AdminDashboard.css";
// import productsData from "./productsData";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]); // State to store fetched products
  const [sortBy, setSortBy] = useState(""); // State to track selected sorting option
  const [searchQuery, setSearchQuery] = useState(""); // State to track search query

  useEffect(() => {
    // Function to fetch products from the backend API
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://j37nyv-5000.csb.app/api/getDashboardProducts",
        ); // Replace with your backend API endpoint
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error("Failed to fetch products:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    // Call the fetchProducts function to fetch products when the component mounts
    fetchProducts();
  }, []);

  // Function to handle sorting change
  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  // Function to handle search query change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Function to handle search action
  const handleSearch = () => {
    // Perform search action here
    console.log("Search button clicked:", searchQuery);
  };

  // Function to sort products based on the selected option
  const filteredAndSortedProducts = useMemo(() => {
    const filterProducts = (products) => {
      if (!searchQuery) {
        return products;
      }
      return products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    };

    const sortProducts = (products) => {
      switch (sortBy) {
        case "category":
          return products
            .slice()
            .sort((a, b) => a.category.localeCompare(b.category));
        case "listed_by":
          return products
            .slice()
            .sort((a, b) => a.farmer_name.localeCompare(b.farmer_name));
        case "price":
          return products
            .slice()
            .sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        case "in_stock":
          return products
            .slice()
            .sort((a, b) => parseFloat(a.in_stock) - parseFloat(b.in_stock));
        case "date_of_listing":
          return products
            .slice()
            .sort((a, b) => new Date(a.addedDate) - new Date(b.addedDate));
        default:
          return products;
      }
    };

    return sortProducts(filterProducts(products));
  }, [products, searchQuery, sortBy]);

  return (
    <div>
      <div className="dashboard-container">
        {/* First flexbox container */}
        <div className="dashboard-item">
          <h3>Total Products</h3>
          <p>{sessionStorage.getItem("productCount")}</p>
        </div>

        {/* Second flexbox container */}
        <div className="dashboard-item">
          <h3>Total Retailers</h3>
          <p>{sessionStorage.getItem("retailerCount")}</p>
        </div>

        {/* Third flexbox container */}
        <div className="dashboard-item">
          <h3>Total Farmers</h3>
          <p>{sessionStorage.getItem("farmerCount")}</p>
        </div>
      </div>
      <div className="admin-products-container">
        <h2>List of Products</h2>
        {/* Filter and search bar */}
        <div className="admin-filter-search-bar">
          <div className="admin-filter-bar">
            <h2>Filter:</h2>
            <select value={sortBy} onChange={handleSortChange}>
              <option value="">Sort By</option>
              <option value="category">Category</option>
              <option value="price">Price</option>
              <option value="quantity">Quantity</option>
              <option value="date">Date</option>
            </select>
          </div>
          {/* Search bar */}
          <div className="admin-search-bar">
            <input
              type="text"
              placeholder="Search by product name..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
        </div>
        {/* Table */}
        <table className="admin-products-table">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Product Name</th>
              <th>Product Category</th>
              <th>Farmer Price (Rs.)</th>
              <th>Retailer Price (Rs.)</th>
              <th>Quantity</th>
              <th>Date</th>
              <th>Listed By</th> {/* New column for who listed the product */}
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedProducts.map((product, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <Link to={`/adminlayout/addedproducts/${product.id}`}>
                    {product.product_name}
                  </Link>
                </td>
                <td>{product.product_category}</td>
                <td>{product.farmer_price}</td>
                <td>{product.retailer_price}</td>
                <td>{product.in_stock}</td>
                <td>{new Date(product.date).toLocaleDateString("en-GB")}</td>
                <td>{product.farmer_name}</td>{" "}
                {/* Display who listed the product */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
