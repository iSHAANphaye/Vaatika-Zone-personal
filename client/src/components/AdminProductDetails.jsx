import React from "react";
import "../AdminProductDetails.css";

const AdminProductDetails = () => {
  const handleRemoveProduct = () => {
    // Implement removal logic here
    console.log("Product removed");
  };

  return (
    <div className="">
      <div className="product-image"></div>
      <div className="product-details">
        <h2 className="product-name">Product Name</h2>
        <p className="product-category">Category Name</p>
        <p className="product-description">Product Description</p>
        <p className="product-quantity">10 units</p>
        <p className="product-price">$10.99</p>
        <p className="listing-date">13/03/2024</p>
        <p className="listed-by">Admin 1</p>
        <button
          className="admin-remove-product-btn"
          onClick={handleRemoveProduct}
        >
          Remove Product
        </button>
      </div>
    </div>
  );
};

export default AdminProductDetails;
