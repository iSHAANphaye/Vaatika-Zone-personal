import React from "react";
import "../AdminRetailerDetails.css";
import { UserProfilePic } from "../assets";

const AdminRetailerDetails = () => {
  // Dummy data for the retailer profile
  const retailerData = {
    profilePicture: "profile.jpg",
    name: "John Doe",
    email: "johndoe@example.com",
    phoneNumber: "+1234567890",
    address: "123 Main Street, City, Country",
    wishlistedProducts: [
      {
        id: 1,
        name: "Product 1",
        category: "Category 1",
        price: "Rs.10",
        quantity: "20",
        orderdate: "19/03/2024",
        status: "Approved",
      },
      {
        id: 2,
        name: "Product 2",
        category: "Category 2",
        price: "Rs.15",
        quantity: "20",
        orderdate: "19/03/2024",
        status: "Approved",
      },
      {
        id: 3,
        name: "Product 3",
        category: "Category 1",
        price: "Rs.20",
        quantity: "20",
        orderdate: "19/03/2024",
        status: "Approved",
      },
      {
        id: 4,
        name: "Product 3",
        category: "Category 1",
        price: "Rs.20",
        quantity: "20",
        orderdate: "19/03/2024",
        status: "Approved",
      },
      {
        id: 5,
        name: "Product 3",
        category: "Category 1",
        price: "Rs.20",
        quantity: "20",
        orderdate: "19/03/2024",
        status: "Approved",
      },
      {
        id: 6,
        name: "Product 3",
        category: "Category 1",
        price: "Rs.20",
        quantity: "20",
        orderdate: "19/03/2024",
        status: "Approved",
      },
      {
        id: 7,
        name: "Product 3",
        category: "Category 1",
        price: "Rs.20",
        quantity: "20",
        orderdate: "19/03/2024",
        status: "Approved",
      },
      {
        id: 8,
        name: "Product 3",
        category: "Category 1",
        price: "Rs.20",
        quantity: "20",
        orderdate: "19/03/2024",
        status: "Approved",
      },
      {
        id: 9,
        name: "Product 3",
        category: "Category 1",
        price: "Rs.20",
        quantity: "20",
        orderdate: "19/03/2024",
        status: "Approved",
      },
      {
        id: 10,
        name: "Product 3",
        category: "Category 1",
        price: "Rs.20",
        quantity: "20",
        orderdate: "19/03/2024",
        status: "Approved",
      },
      {
        id: 11,
        name: "Product 3",
        category: "Category 1",
        price: "Rs.20",
        quantity: "20",
        orderdate: "19/03/2024",
        status: "Approved",
      },
      // Add more wishlisted products as needed
    ],
  };

  // Function to handle removal of retailer
  const handleRemoveRetailer = () => {
    // Implement removal logic here
    console.log("Retailer removed");
  };

  return (
    <div className="retailer-profile">
      <div className="profile-header">
        <img
          src={UserProfilePic} // Replace with the URL of the profile picture
          alt="Profile"
          className="profile-picture"
        />
        <div className="profile-details">
          <p>Name: John Doe</p>
          <p>Email: johndoe@example.com</p>
          <p>Phone: +1234567890</p>
          <p>Address: 123 Main St, City, Country</p>
        </div>
      </div>
      <div className="wishlist-table">
        <h3>Ordered Products</h3>
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Order Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {retailerData.wishlistedProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td>{product.orderdate}</td>
                <td>{product.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <button className="remove-retailer-btn" onClick={handleRemoveRetailer}>
          Remove Retailer
        </button>
      </div>
    </div>
  );
};

export default AdminRetailerDetails;
