import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../FarmerProductDetails.css";

const AdminProductDetails = () => {
  const productId = useParams().productId;
  console.log("Product with ID " + productId + " is present.");

  const [productDetails, setProductDetails] = useState({});
  const [editedProduct, setEditedProduct] = useState({});

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

  const handleRemoveProduct = () => {
    // Implement removal logic here
    console.log("Product with ID " + productId + " has been removed.");
  };
  return (
    <div className="product-container2">
      <div className="product-image2"></div>
      <div className="product-details2">
        <h2 className="product-name2">{editedProduct.product_name}</h2>
        <p className="product-category2">{editedProduct.category}</p>
        <p className="product-description2">{editedProduct.description}</p>
        <p className="product-quantity2">{editedProduct.in_stock}</p>
        <p className="product-price2">${editedProduct.price}</p>
        <p className="listing-date2">
          {new Date(editedProduct.date_of_listing).toLocaleDateString("en-GB")}
        </p>
        <p className="listed-by2">Admin 1</p>
        <button className="remove-product-btn2" onClick={handleRemoveProduct}>
          Remove Product
        </button>
      </div>
    </div>
  );
};

export default AdminProductDetails;

// import React, { useEffect, useState, useParams } from "react";
// import "../FarmerProductDetails.css";

// const AdminProductDetails = () => {
//   const [productDetails, setProductDetails] = useState({});
//   const productId = useParams().productId;

//   // const [adminProduct, setAdminProduct] = useState({
//   //   // profilePic: UserProfilePic,
//   //   productname: sessionStorage.getItem("productName") || "",
//   //   category: sessionStorage.getItem("category") || "",
//   //   phone: sessionStorage.getItem("adminPhone") || "",
//   //   address: sessionStorage.getItem("adminAddress") || "",
//   //   password: sessionStorage.getItem("adminPassword") || "",
//   // });

//   useEffect(() => {
//     const fetchProductDetails = async () => {
//       try {
//         const url = `https://j37nyv-5000.csb.app/api/getProductDetails?productId=${productId}`;
//         // const url = `https://vaatiika-zone-backend.onrender.com/api/getProductDetails?productId=${productId}`
//         const response = await fetch(url);
//         if (response.ok) {
//           const data = await response.json();
//           setProductDetails(data[0]); // Assuming the API returns an array with a single product object
//         } else {
//           console.error(
//             "Failed to fetch product details:",
//             response.statusText,
//           );
//         }
//       } catch (error) {
//         console.error("Error fetching product details:", error);
//       }
//     };

//     fetchProductDetails();
//   }, [productId]);

//   const handleRemoveProduct = () => {
//     // Implement removal logic here
//     console.log("Product removed");
//   };

//   // Edit mode state
//   // const [editMode, setEditMode] = useState(false);

//   return (
//     <div className="product-container2">
//       <div className="product-image2"></div>
//       <div className="product-details2">
//         <h2 className="product-name2">Product Name</h2>
//         <p className="product-category2">Category Name</p>
//         <p className="product-description2">Product Description</p>
//         <p className="product-quantity2">10 units</p>
//         <p className="product-price2">$10.99</p>
//         <p className="listing-date2">13/03/2024</p>
//         <p className="listed-by2">Admin 1</p>
//         <button className="remove-product-btn2" onClick={handleRemoveProduct}>
//           Remove Product
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AdminProductDetails;
