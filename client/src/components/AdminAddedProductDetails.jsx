import React from "react";
import "../AdminAddedProductDetails.css";

const AdminAddedProductDetails = () => {
  // Function to handle removal of retailer
  const handleRemoveProduct = () => {
    // Implement removal logic here
    console.log("Product removed");
  };
  return (
    <div className="product-card">
      <div className="product-image"></div>
      <div className="product-details">
        <h2 className="product-name">Dashboard Product</h2>
        <p className="product-category">Category Name</p>
        <p className="product-description">Product Description</p>
        <p className="product-quantity">10 units</p>
        <p className="product-price">$10.99</p>
        <p className="listing-date">13/03/2024</p>
        <p className="listed-by">Admin 1</p>
      </div>
      <div>
        <button className="remove-product-btn" onClick={handleRemoveProduct}>
          Remove Product
        </button>
      </div>
    </div>
  );
};

export default AdminAddedProductDetails;
