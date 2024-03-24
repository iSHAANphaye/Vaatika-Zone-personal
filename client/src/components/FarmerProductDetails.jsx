import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../FarmerProductDetails.css";
import "../AdminAddedProductDetails.css";

const FarmerProductDetails = () => {
  const [productDetails, setProductDetails] = useState({});
  const [editMode, setEditMode] = useState(false);

  const productId = useParams().productId;

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const url = `https://j37nyv-5000.csb.app/api/getProductDetails?productId=${productId}`;
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setProductDetails(data[0]);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductDetails({ ...productDetails, [name]: value });
  };

  const handleRemoveProduct = () => {
    const farmerId = parseInt(sessionStorage.getItem("farmerId"), 10);
    console.log("Deleting Farmer ID:", farmerId);
    const url = `https://j37nyv-5000.csb.app/api/deleteFarmerProduct?productId=${productId}`;
    // const url = `https://vaatiika-zone-backend.onrender.com/api/deleteFarmerProduct?productId=${productId}`;
    fetch(url)
      .then((response) => {
        if (response.ok) {
          // Profile deleted successfully
          // Redirect the user to the login page or any other appropriate action
          window.location.href = "/farmerdashboard/products";
        } else {
          // Handle other response statuses
          throw new Error("Failed to delete product");
        }
      })
      .catch((error) => {
        // Handle errors
        console.error("Error deleting product:", error);
        // Display error message to the user
        alert("Failed to delete product. Please try again later.");
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const editedData = {
        productName: productDetails.product_name,
        category: productDetails.category,
        description: productDetails.description,
        price: productDetails.price,
        inStock: productDetails.in_stock,
      };

      const url = `https://j37nyv-5000.csb.app/api/editFarmerProduct?productId=${productId}`;
      // const url = `https://vaatiika-zone-backend.onrender.com/api/editFarmerProfile?productId=${productId}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedData),
      });

      if (response.ok) {
        setEditMode(false);
        console.log("Product edited successfully");
      }
      // Add your logic to update product details
    } catch (error) {
      console.error("Error editing product:", error);
    }
  };

  const handleEditProduct = () => {
    setEditMode(!editMode);
  };

  return (
    <div className="admin-added-product">
      <div className="product-details">
        {/* Product Name */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Product name:</label>
            <input
              type="text"
              name="product_name"
              value={
                editMode
                  ? productDetails.product_name
                  : productDetails.product_name
              }
              placeholder={
                editMode ? "Enter product name" : productDetails.product_name
              }
              onChange={handleChange}
              disabled={!editMode}
            />
            {/* <input type="text" value={productDetails.product_name} disabled /> */}
          </div>

          {/* Category */}
          <div className="form-group">
            <label>Category:</label>
            <input
              type="text"
              name="category"
              value={
                editMode ? productDetails.category : productDetails.category
              }
              placeholder={
                editMode ? "Enter product name" : productDetails.category
              }
              onChange={handleChange}
              disabled={!editMode}
            />
            {/* <input type="text" value={productDetails.category} disabled /> */}
          </div>

          {/* Description */}
          <div className="form-group">
            <label>Description:</label>
            <input
              type="text"
              name="description"
              value={
                editMode
                  ? productDetails.description
                  : productDetails.description
              }
              placeholder={
                editMode ? "Enter product name" : productDetails.description
              }
              onChange={handleChange}
              disabled={!editMode}
            />
          </div>

          {/* Price */}
          <div className="form-group">
            <label>Price:</label>
            <input
              type="text"
              name="price"
              value={editMode ? productDetails.price : productDetails.price}
              placeholder={
                editMode ? "Enter product name" : productDetails.price
              }
              onChange={handleChange}
              disabled={!editMode}
            />
          </div>

          {/* Quantity */}
          <div className="form-group">
            <label>Quantity:</label>
            <input
              type="text"
              name="in_stock"
              value={
                editMode ? productDetails.in_stock : productDetails.in_stock
              }
              placeholder={
                editMode ? "Enter product name" : productDetails.in_stock
              }
              onChange={handleChange}
              disabled={!editMode}
            />
          </div>
          {/* <div>
            <button className="edit-product-btn2" onClick={handleEditProduct}>
              Edit Product
            </button>
          </div> */}
          <div className="button-group">
            <button
              className="edit-button"
              type="button"
              onClick={handleEditProduct}
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
          <div>
            <button
              className="remove-product-btn2"
              onClick={handleRemoveProduct}
            >
              Remove Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// return (
//   <div className="product-container2">
//     <div className="product-image2"></div>
//     <div className="product-details2">
//       <h2 className="product-name2">{productDetails.product_name}</h2>
//       <p className="product-category2">{productDetails.category}</p>
//       <p className="product-description2">{productDetails.description}</p>
//       <p className="product-quantity2">In Stock: {productDetails.in_stock}</p>
//       <p className="product-price2">Price: ${productDetails.price}</p>
//       <p className="listing-date2">
//         {new Date(productDetails.date_of_listing).toLocaleDateString("en-GB")}
//       </p>
//     </div>
//     <div>
// <div>
//   <button className="edit-product-btn2" onClick={handleEditProduct}>
//     Edit Product
//   </button>
// </div>
// <div>
//   <button className="remove-product-btn2" onClick={handleRemoveProduct}>
//     Remove Product
//   </button>
// </div>
//     </div>
//   </div>
// );
// };

export default FarmerProductDetails;
