import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../AdminAddedProductDetails.css";

const AdminAddedProductDetails = () => {
  const productId = useParams().productId;
  console.log("Product with ID " + productId + " is present.");
  // Admin profile data state

  const [productDetails, setProductDetails] = useState({});
  const [editedProduct, setEditedProduct] = useState({});

  // const [productData, setProductData] = useState({
  //   productName: "Apple",
  //   category: "fruits",
  //   description: "dhbcgdvgcbhdbchb yuebcgbvcc cvubcuedbc vbecbdbc cbyebcyhbch",
  //   price: "Rs.20/kg",
  //   quantity: "50kg",
  // });

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        // const url = `https://vaatiika-zone-backend.onrender.com/api/getProductDetails?productId=${productId}`;
        const url = `https://j37nyv-5000.csb.app/api/getProductDetails?productId=${productId}`;
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setProductDetails(data[0]); // Assuming the API returns an array with a single product object
          setEditedProduct(data[0]);
        } else {
          console.error(
            "Failed to fetch product details:",
            response.statusText,
          );
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  // Edit mode state
  const [editMode, setEditMode] = useState(false);

  // Handle edit button click
  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  // Handle delete button click
  const handleDeleteClick = () => {
    // Implement logic to delete the product
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement logic to update product data
    setEditMode(false);
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setProductData({ ...productData, [name]: value });
  // };

  // Handle product image change

  return (
    <div className="admin-added-product">
      <form onSubmit={handleSubmit}>
        {/* Product Image */}

        {/* Product Name */}
        <div className="form-group">
          <label>Product name:</label>
          <input
            type="text"
            name="productName"
            value={editedProduct.product_name}
            onChange={handleChange}
            disabled={!editMode}
          />
        </div>

        {/* Category */}
        <div className="form-group">
          <label>Category:</label>
          <input
            type="text"
            name="category"
            value={editedProduct.category}
            onChange={handleChange}
            disabled={!editMode}
          />
        </div>

        {/* Description */}
        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={editedProduct.description}
            onChange={handleChange}
            disabled={!editMode}
          ></textarea>
        </div>

        {/* Price */}
        <div className="form-group">
          <label>Price:</label>
          <input
            type="text"
            name="price"
            value={editedProduct.price}
            onChange={handleChange}
            disabled={!editMode}
          />
        </div>

        {/* Quantity */}
        <div className="form-group">
          <label>Quantity:</label>
          <input
            type="text"
            name="quantity"
            value={editedProduct.in_stock}
            onChange={handleChange}
            disabled={!editMode}
          />
        </div>

        {/* Buttons */}
        <div className="button-group">
          <button
            className="edit-button"
            type="button"
            onClick={handleEditClick}
          >
            {editMode ? "Cancel" : "Edit"}
          </button>
          {/* Display save button when in edit mode */}
          {editMode && (
            <button className="save-button" type="submit">
              Save
            </button>
          )}
        </div>
        <div className="button-group">
          <button
            className="delete-button"
            type="button"
            onClick={handleDeleteClick}
          >
            Delete Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminAddedProductDetails;
