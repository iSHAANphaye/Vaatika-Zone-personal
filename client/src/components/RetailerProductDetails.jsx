import React, { useState } from "react";
import "../AdminProductDetails.css";

const RetailerProductDetails = () => {
  const [orderQuantity, setOrderQuantity] = useState(1); // State to track order quantity

  const handleEditProduct = () => {
    // Implement order logic here
    console.log("Order placed with quantity:", orderQuantity);
  };

  const handleQuantityChange = (event) => {
    const quantity = parseInt(event.target.value);
    setOrderQuantity(quantity);
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
        {/* Input field for order quantity */}
        <div className="order-quantity">
          <label htmlFor="quantity">Enter value : </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            min="1"
            value={orderQuantity}
            onChange={handleQuantityChange}
          />
        </div>
        <div>
          <button
            className="retailer-edit-product-btn"
            onClick={handleEditProduct}
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default RetailerProductDetails;
