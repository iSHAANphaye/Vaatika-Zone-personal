// const FarmerProductDetails = () => {
//   const [productDetails, setProductDetails] = useState({});
//   const [editedProduct, setEditedProduct] = useState({});
//   const productId = useParams().productId;

//   useEffect(() => {
//     const fetchProductDetails = async () => {
//       try {
//         // const url = `https://vaatiika-zone-backend.onrender.com/api/getProductDetails?productId=${productId}`;
//         const url = `https://j37nyv-5000.csb.app/api/getProductDetails?productId=${productId}`;
//         const response = await fetch(url);
//         if (response.ok) {
//           const data = await response.json();
//           setProductDetails(data[0]); // Assuming the API returns an array with a single product object
//           setEditedProduct(data[0]);
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

//   // Function to handle removal of retailer
//   const handleRemoveProduct = () => {
//     // Implement removal logic here
//     console.log("Product with ID", productId, "has been removed");
//   };

//   // Edit mode state
//   // const [editMode, setEditMode] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditedProduct({ ...editedProduct, [name]: value });
//   };

import React from "react";
import "../FarmerProductDetails.css";

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
    <div className="product-container2">
      <div className="product-image2"></div>
      <div className="product-details2">
        <h2 className="product-name2">Product Name</h2>
        <p className="product-category2">Category Name</p>
        <p className="product-description2">Product Description</p>
        <p className="product-quantity2">10 units</p>
        <p className="product-price2">$10.99</p>
        <p className="listing-date2">13/03/2024</p>
      </div>
      <div>
        <div>
          <button className="edit-product-btn2" onClick={handleEditProduct}>
            Edit Product
          </button>
        </div>
        <div>
          <button className="remove-product-btn2" onClick={handleRemoveProduct}>
            Remove Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default FarmerProductDetails;
