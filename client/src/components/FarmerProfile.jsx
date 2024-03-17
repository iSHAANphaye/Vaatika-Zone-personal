import React, { useState } from "react";
import "../FarmerProfile.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { UserProfilePic } from "../assets";

const FarmerProfile = () => {
  // Farmer profile data state
  const [profileData, setProfileData] = useState({
    profilePic: UserProfilePic,
    username: sessionStorage.getItem("farmerName") || "",
    email: sessionStorage.getItem("farmerEmail") || "",
    phone: sessionStorage.getItem("farmerPhone") || "",
    address: sessionStorage.getItem("farmerAddress") || "",
    password: sessionStorage.getItem("farmerPassword") || "",
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
      const farmerId = parseInt(sessionStorage.getItem("farmerId"), 10);
      const url = `https://j37nyv-5000.csb.app/api/editFarmerProfile?farmerId=${farmerId}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      });
      if (response.ok) {
        sessionStorage.setItem("farmerName", profileData.username);
        sessionStorage.setItem("farmerEmail", profileData.email);
        sessionStorage.setItem("farmerPhone", profileData.phone);
        sessionStorage.setItem("farmerAddress", profileData.address);
        sessionStorage.setItem("farmerPassword", profileData.password);
        console.log("Farmer Profile Update Successful:", farmerId);
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
  //   // Implement logic to update Farmer profile data
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
    const farmerId = parseInt(sessionStorage.getItem("farmerId"), 10);
    fetch(
      `https://j37nyv-5000.csb.app/api/deleteFarmerProfile?farmerId=${farmerId}`,
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
    <div className="farmer-profile">
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
          {sessionStorage.getItem("farmerName")}!
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
                : sessionStorage.getItem("farmerName")
            }
            placeholder={
              editMode ? sessionStorage.getItem("farmerName") : "Username"
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
                : sessionStorage.getItem("farmerEmail")
            }
            placeholder={
              editMode ? sessionStorage.getItem("farmerEmail") : "Email"
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
                : sessionStorage.getItem("farmerPhone")
            }
            placeholder={
              editMode ? sessionStorage.getItem("farmerPhone") : "Phone"
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
                : sessionStorage.getItem("farmerAddress")
            }
            placeholder={
              editMode ? sessionStorage.getItem("farmerAddress") : "Address"
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
                  : sessionStorage.getItem("farmerPassword")
              }
              placeholder={
                editMode ? sessionStorage.getItem("farmerPassword") : "Password"
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

export default FarmerProfile;
