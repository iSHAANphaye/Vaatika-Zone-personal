import React, { useState } from "react";
import "../RetailerProfile.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { UserProfilePic } from "../assets";

const RetailerProfile = () => {
  // Retailer profile data state
  const [profileData, setProfileData] = useState({
    profilePic: UserProfilePic,
    username: sessionStorage.getItem("retailerName") || "",
    email: sessionStorage.getItem("retailerEmail") || "",
    phone: sessionStorage.getItem("retailerPhone") || "",
    address: sessionStorage.getItem("retailerAddress") || "",
    password: sessionStorage.getItem("retailerPassword") || "",
  });

  // Edit mode state
  const [editMode, setEditMode] = useState(false);

  // Show/hide password state
  const [showPassword, setShowPassword] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const retailerId = parseInt(sessionStorage.getItem("retailerId"), 10);
      const url = `https://vaatiika-zone-backend.onrender.com/api/editRetailerProfile?retailerId=${retailerId}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      });
      if (response.ok) {
        sessionStorage.setItem("retailerName", profileData.username);
        sessionStorage.setItem("retailerEmail", profileData.email);
        sessionStorage.setItem("retailerPhone", profileData.phone);
        sessionStorage.setItem("retailerAddress", profileData.address);
        sessionStorage.setItem("retailerPassword", profileData.password);
        console.log("Retailer Profile Update Successful:", retailerId);
        window.location.reload();
        // Clear form data
      } else {
        console.error("Failed to edit profile:", response.statusText);
      }
    } catch (error) {
      console.error("Error editing profile:", error);
    }
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   // Implement logic to update Retailer profile data
  //   setEditMode(false);
  // };

  // Handle edit button click
  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  // Handle show/hide password
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  // Handle delete button click
  const handleDeleteClick = () => {
    // Send a request to the backend to delete the user's profile
    const retailerId = parseInt(sessionStorage.getItem("retailerId"), 10);
    fetch(
      `https://j37nyv-5000.csb.app/api/deleteRetailerProfile?retailerId=${retailerId}`,
    )
      .then((response) => {
        if (response.ok) {
          // Profile deleted successfully
          // Redirect the user to the login page or any other appropriate action
          window.location.href = "/";
        } else {
          // Handle other response statuses
          throw new Error("Failed to delete profile");
        }
      })
      .catch((error) => {
        // Handle errors
        console.error("Error deleting profile:", error);
        // Display error message to the user
        alert("Failed to delete profile. Please try again later.");
      });
  };

  // Handle profile picture change
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileData({ ...profileData, profilePic: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="retailer-profile">
      <div className="user-info">
        {/* Display user image */}
        <div className="user-image">
          <img src={profileData.profilePic} alt="User" />
          {editMode && (
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePicChange}
            />
          )}
        </div>
        {/* Display username */}
        <div className="welcome-message">
          {sessionStorage.getItem("retailerName")}!
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        {/* Display username */}
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={
              editMode
                ? profileData.username
                : sessionStorage.getItem("retailerName")
            }
            placeholder={
              editMode ? sessionStorage.getItem("retailerName") : "Username"
            }
            onChange={handleChange}
            disabled={!editMode}
          />
        </div>
        {/* Display email */}
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={
              editMode
                ? profileData.email
                : sessionStorage.getItem("retailerEmail")
            }
            placeholder={
              editMode ? sessionStorage.getItem("retailerEmail") : "Email"
            }
            onChange={handleChange}
            disabled={!editMode}
          />
        </div>
        {/* Display phone */}
        <div className="form-group">
          <label>Phone:</label>
          <input
            type="tel"
            name="phone"
            value={
              editMode
                ? profileData.phone
                : sessionStorage.getItem("retailerPhone")
            }
            placeholder={
              editMode ? sessionStorage.getItem("retailerPhone") : "Phone"
            }
            onChange={handleChange}
            disabled={!editMode}
          />
        </div>
        {/* Display address */}
        <div className="form-group">
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={
              editMode
                ? profileData.address
                : sessionStorage.getItem("retailerAddress")
            }
            placeholder={
              editMode ? sessionStorage.getItem("retailerAddress") : "Address"
            }
            onChange={handleChange}
            disabled={!editMode}
          />
        </div>
        {/* Display password */}
        <div className="form-group">
          <label>Password:</label>
          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={
                editMode
                  ? profileData.password
                  : sessionStorage.getItem("retailerPassword")
              }
              placeholder={
                editMode
                  ? sessionStorage.getItem("retailerPassword")
                  : "Password"
              }
              onChange={handleChange}
              disabled={!editMode}
            />
            {showPassword ? (
              <AiOutlineEyeInvisible
                onClick={handleTogglePassword}
                className="eye-icon"
              />
            ) : (
              <AiOutlineEye
                onClick={handleTogglePassword}
                className="eye-icon"
              />
            )}
          </div>
        </div>
        {/* Display buttons */}
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
            Delete Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default RetailerProfile;
