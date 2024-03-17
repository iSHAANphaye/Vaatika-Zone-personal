import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
// import products from "./productsData";
import "../AdminProducts.css";

const AdminProducts = () => {
  const [products, setProducts] = useState([]); // State to store fetched products
  const [sortBy, setSortBy] = useState(""); // State to track selected sorting option
  const [searchQuery, setSearchQuery] = useState(""); // State to track search query

  useEffect(() => {
    // Function to fetch products from the backend API
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://vaatiika-zone-backend.onrender.com/api/getAllProducts",
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
  // Filter and sort products
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
    <div className="products-container">
      <h2>List of Products</h2>
      <div className="filter-search-bar">
        <div className="filter-bar">
          <h2>Filter:</h2>
          <select value={sortBy} onChange={handleSortChange}>
            <option value="">Sort By</option>
            <option value="category">Category</option>
            <option value="price">Price</option>
            <option value="in_stock">Quantity</option>
            <option value="listed_by">Listed by</option>
          </select>
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by product name..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>
      <table className="products-table">
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Listed By</th>
            <th>Product Name</th>
            <th>Product Category</th>
            <th>Description</th>
            <th>Price (Rs.)</th>
            <th>Quantity</th>
            <th>Date</th>
            <th>Product ID</th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedProducts.map((product, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{product.farmer_name}</td>
              <td>
                <Link to={`/adminlayout/product/${product.id}`}>
                  {product.product_name}
                </Link>
              </td>
              <td>{product.category}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.in_stock}</td>
              <td>
                {new Date(product.date_of_listing).toLocaleDateString("en-GB")}
              </td>
              <td>{product.product_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProducts;
