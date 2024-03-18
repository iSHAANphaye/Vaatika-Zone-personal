import React from "react";
import "../AdminAddedProductDetails.css";

const FarmerProductDetails = () => {
  // Function to handle removal of retailer
  const handleRemoveProduct = () => {
    // Implement removal logic here
    console.log("Product removed");
  };

  const handleEditProduct = () => {
    // Implement removal logic here
    console.log("Product edit");
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
      </div>
      <div>
        <div>
          <button className="edit-product-btn" onClick={handleEditProduct}>
            Edit Product
          </button>
        </div>
        <div>
          <button className="remove-product-btn" onClick={handleRemoveProduct}>
            Remove Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default FarmerProductDetails;
