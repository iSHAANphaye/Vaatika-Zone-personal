import React, { useState } from 'react';
import '../RetailerWishlist.css';

const RetailerWishlist = () => {
  // Sample data for ordered products
  const [orderedProducts, setOrderedProducts] = useState([
    {
      id: 1,
      productName: 'Product 1',
      category: 'Category 1',
      price: '$10',
      quantityOrdered: 5,
      orderDate: '2024-03-15',
      orderStatus: 'Pending',
    },
    {
      id: 2,
      productName: 'Product 2',
      category: 'Category 2',
      price: '$15',
      quantityOrdered: 3,
      orderDate: '2024-03-14',
      orderStatus: 'Processing',
    },
    {
      id: 2,
      productName: 'Product 2',
      category: 'Category 2',
      price: '$15',
      quantityOrdered: 3,
      orderDate: '2024-03-14',
      orderStatus: 'Processing',
    },
    {
      id: 2,
      productName: 'Product 2',
      category: 'Category 2',
      price: '$15',
      quantityOrdered: 3,
      orderDate: '2024-03-14',
      orderStatus: 'Processing',
    },
    {
      id: 2,
      productName: 'Product 2',
      category: 'Category 2',
      price: '$15',
      quantityOrdered: 3,
      orderDate: '2024-03-14',
      orderStatus: 'Processing',
    },
    {
      id: 2,
      productName: 'Product 2',
      category: 'Category 2',
      price: '$15',
      quantityOrdered: 3,
      orderDate: '2024-03-14',
      orderStatus: 'Processing',
    },
    {
      id: 2,
      productName: 'Product 2',
      category: 'Category 2',
      price: '$15',
      quantityOrdered: 3,
      orderDate: '2024-03-14',
      orderStatus: 'Processing',
    },
    {
      id: 2,
      productName: 'Product 2',
      category: 'Category 2',
      price: '$15',
      quantityOrdered: 3,
      orderDate: '2024-03-14',
      orderStatus: 'Processing',
    },
    {
      id: 2,
      productName: 'Product 2',
      category: 'Category 2',
      price: '$15',
      quantityOrdered: 3,
      orderDate: '2024-03-14',
      orderStatus: 'Processing',
    },
    {
      id: 2,
      productName: 'Product 2',
      category: 'Category 2',
      price: '$15',
      quantityOrdered: 3,
      orderDate: '2024-03-14',
      orderStatus: 'Processing',
    },
    {
      id: 2,
      productName: 'Product 2',
      category: 'Category 2',
      price: '$15',
      quantityOrdered: 3,
      orderDate: '2024-03-14',
      orderStatus: 'Processing',
    },
    {
      id: 2,
      productName: 'Product 2',
      category: 'Category 2',
      price: '$15',
      quantityOrdered: 3,
      orderDate: '2024-03-14',
      orderStatus: 'Processing',
    },
    {
      id: 2,
      productName: 'Product 2',
      category: 'Category 2',
      price: '$15',
      quantityOrdered: 3,
      orderDate: '2024-03-14',
      orderStatus: 'Processing',
    },
    {
      id: 2,
      productName: 'Product 2',
      category: 'Category 2',
      price: '$15',
      quantityOrdered: 3,
      orderDate: '2024-03-14',
      orderStatus: 'Processing',
    },
    {
      id: 2,
      productName: 'Product 2',
      category: 'Category 2',
      price: '$15',
      quantityOrdered: 3,
      orderDate: '2024-03-14',
      orderStatus: 'Processing',
    },
    {
      id: 2,
      productName: 'Product 2',
      category: 'Category 2',
      price: '$15',
      quantityOrdered: 3,
      orderDate: '2024-03-14',
      orderStatus: 'Processing',
    },
    {
      id: 2,
      productName: 'Product 2',
      category: 'Category 2',
      price: '$15',
      quantityOrdered: 3,
      orderDate: '2024-03-14',
      orderStatus: 'Processing',
    },
    {
      id: 2,
      productName: 'Product 2',
      category: 'Category 2',
      price: '$15',
      quantityOrdered: 3,
      orderDate: '2024-03-14',
      orderStatus: 'Processing',
    },
    // Add more ordered products here...
  ]);

  // State for search input
  const [searchInput, setSearchInput] = useState('');

  // Function to handle search
  const handleSearch = () => {
    // Filter the ordered products based on search input
    const filteredProducts = orderedProducts.filter(product =>
      product.productName.toLowerCase().includes(searchInput.toLowerCase())
    );
    // Update the ordered products state with filtered products
    setOrderedProducts(filteredProducts);
  };

  // Function to handle cancel order
  const handleCancelOrder = (id) => {
    // Remove the order with the given id
    const updatedProducts = orderedProducts.filter(product => product.id !== id);
    // Update the ordered products state
    setOrderedProducts(updatedProducts);
  };

  return (
    <div className="retailer-wishlist">
      <h1>All Ordered Products</h1>
      {/* Search bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by product name"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Quantity Ordered</th>
            <th>Order Date</th>
            <th>Order Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orderedProducts.map(product => (
            <tr key={product.id}>
              <td>{product.productName}</td>
              <td>{product.category}</td>
              <td>{product.price}</td>
              <td>{product.quantityOrdered}</td>
              <td>{product.orderDate}</td>
              <td>{product.orderStatus}</td>
              <td>
                <button className='cancel-order-button' onClick={() => handleCancelOrder(product.id)}>Cancel Order</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RetailerWishlist;