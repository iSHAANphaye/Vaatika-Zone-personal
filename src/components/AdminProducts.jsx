import React, { useState } from 'react';
import productsData from './productsData';
import '../AdminProducts.css';

const AdminProducts = () => {
  const [sortBy, setSortBy] = useState(''); // State to track selected sorting option
  const [searchQuery, setSearchQuery] = useState(''); // State to track search query

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
    console.log('Search button clicked:', searchQuery);
  };

  // Function to sort products based on the selected option
  const sortProducts = (products) => {
    switch (sortBy) {
      case 'category':
        return products.slice().sort((a, b) => a.category.localeCompare(b.category));
      case 'price':
        return products.slice().sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      case 'quantity':
        return products.slice().sort((a, b) => parseFloat(a.quantity) - parseFloat(b.quantity));
      case 'date':
        return products.slice().sort((a, b) => new Date(a.addedDate) - new Date(b.addedDate));
      default:
        return products;
    }
  };

  // Function to filter products based on search query
  const filterProducts = (products) => {
    if (!searchQuery) {
      return products;
    }
    return products.filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()));
  };

  // Filter and sort products
  const filteredAndSortedProducts = sortProducts(filterProducts(productsData));

  return (
    <div className="product-container">
      <h2>List of Products</h2>
      {/* Filter and search bar */}
      <div className="filter-search-bar">
        <div className="filter-bar">
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
      {/* Table */}
      <table className="product-table">
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Product Name</th>
            <th>Product Category</th>
            <th>Price (Rs.)</th>
            <th>Quantity</th>
            <th>Date</th>
            <th>Listed By</th> {/* New column for who listed the product */}
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedProducts.map((product, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>{product.date}</td>
              <td>{product.listedby}</td> {/* Display who listed the product */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProducts;
