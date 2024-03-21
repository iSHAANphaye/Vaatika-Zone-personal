import React, { useState } from "react";
import "../AdminAddedProductDetails.css";

const AdminAddedProductDetails = () => {
  // Admin profile data state
  const [productData, setProductData] = useState({
    productName: "Apple",
    category: "fruits",
    description: "dhbcgdvgcbhdbchb yuebcgbvcc cvubcuedbc vbecbdbc cbyebcyhbch",
    price: "Rs.20/kg",
    quantity: "50kg",
    orderQuantity: "", // New state for order quantity
  });

  // Handle input change for order quantity
  const handleOrderQuantityChange = (e) => {
    setProductData({ ...productData, orderQuantity: e.target.value });
  };

  // Handle order now button click
  const handleOrderNowClick = () => {
    if (productData.orderQuantity.trim() === "") {
      alert("Please enter your order quantity");
    } else {
      // Implement order submission logic here
      alert(
        `Order placed for ${productData.orderQuantity} of ${productData.productName}`,
      );
    }
  };

  return (
    <div className="admin-added-product">
      <div className="product-details">
        {/* Product Name */}
        <div className="form-group">
          <label>Product name:</label>
          <input type="text" value={productData.productName} disabled />
        </div>

        {/* Category */}
        <div className="form-group">
          <label>Category:</label>
          <input type="text" value={productData.category} disabled />
        </div>

        {/* Description */}
        <div className="form-group">
          <label>Description:</label>
          <textarea value={productData.description} disabled></textarea>
        </div>

        {/* Price */}
        <div className="form-group">
          <label>Price:</label>
          <input type="text" value={productData.price} disabled />
        </div>

        {/* Quantity */}
        <div className="form-group">
          <label>Quantity:</label>
          <input type="text" value={productData.quantity} disabled />
        </div>

        {/* Order Quantity (Editable) */}
        <div className="form-group">
          <label>Order Quantity:</label>
          <input
            type="text"
            value={productData.orderQuantity}
            placeholder="Enter your order value"
            onChange={handleOrderQuantityChange}
          />
        </div>
      </div>

      {/* Order Now Button */}
      <button className="order-now-button" onClick={handleOrderNowClick}>
        Order Now
      </button>
    </div>
  );
};

export default AdminAddedProductDetails;
