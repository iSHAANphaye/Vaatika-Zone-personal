import React, { useState } from "react";
import "../AdminNewProduct.css"; // Import the CSS file

const AdminNewProduct = () => {
  const [formData, setFormData] = useState({
    farmerID: "",
    farmerName: "",
    date: "",
    productName: "",
    productCategory: "",
    productPrice: "",
    productQuantity: "",
    productDescription: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://vaatiika-zone-backend.onrender.com/api/addAdminProduct",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );
      if (response.ok) {
        console.log("Admin product added successfully");
        // Clear form data
        setFormData({
          farmerID: "",
          farmerName: "",
          date: "",
          productName: "",
          productCategory: "",
          productPrice: "",
          productQuantity: "",
          productDescription: "",
        });
      } else {
        console.error("Failed to add product:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="AdminNewProductContainer">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="farmerID">Farmer ID:</label>
        <input
          type="text"
          id="farmerID"
          name="farmerID"
          value={formData.farmerID}
          onChange={handleChange}
        />

        <label htmlFor="farmerName">Farmer Name:</label>
        <input
          type="text"
          id="farmerName"
          name="farmerName"
          value={formData.farmerName}
          onChange={handleChange}
        />

        <label htmlFor="productName">Product Name:</label>
        <input
          type="text"
          id="productName"
          name="productName"
          value={formData.productName}
          onChange={handleChange}
        />

        <label htmlFor="productCategory">Product Category:</label>
        <input
          type="text"
          id="productCategory"
          name="productCategory"
          value={formData.productCategory}
          onChange={handleChange}
        />

        <label htmlFor="productPrice">Product Price:</label>
        <input
          type="text"
          id="productPrice"
          name="productPrice"
          value={formData.productPrice}
          onChange={handleChange}
        />

        <label htmlFor="date">Product Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />

        <label htmlFor="productQuantity">
          <br />
          In Stock Quantity:
        </label>
        <input
          type="text"
          id="productQuantity"
          name="productQuantity"
          value={formData.productQuantity}
          onChange={handleChange}
        />

        <label htmlFor="productDescription">Product Description:</label>
        <textarea
          id="productDescription"
          name="productDescription"
          value={formData.productDescription}
          onChange={handleChange}
          rows="4"
          cols="50"
        ></textarea>

        <label htmlFor="productImage">Product Image:</label>
        <input
          type="file"
          id="productImage"
          name="productImage"
          value={formData.productImage}
          onChange={handleChange}
        />

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AdminNewProduct;
