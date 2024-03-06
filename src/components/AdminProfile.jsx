import React, { useState } from 'react';
import '../AdminProfile.css';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { UserProfilePic } from '../assets';

const AdminProfile = () => {
  // Admin profile data state
  const [profileData, setProfileData] = useState({
    username: 'Admin',
    email: 'admin@example.com',
    phone: '1234567890',
    address: '123 Admin St, City',
    password: 'password', // Initial password
    profilePic: UserProfilePic, // Initial profile picture
  });

  // Edit mode state
  const [editMode, setEditMode] = useState(false);

  // Show/hide password state
  const [showPassword, setShowPassword] = useState(false);

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
    // Implement logic to delete the admin profile
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement logic to update admin profile data
    setEditMode(false);
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
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
    <div className="admin-profile">
      <div className="user-info">
        {/* Display user image */}
        <div className="user-image">
          <img src={profileData.profilePic} alt="User" />
          {editMode && (
            <input type="file" accept="image/*" onChange={handleProfilePicChange} />
          )}
        </div>
        {/* Display username */}
        <div className="welcome-message">Welcome back, {profileData.username}!</div>
      </div>
      <form onSubmit={handleSubmit}>
        {/* Display username */}
        <div className="form-group">
          <label>Username:</label>
          <input type="text" name="username" value={profileData.username} onChange={handleChange} disabled={!editMode} />
        </div>
        {/* Display email */}
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={profileData.email} onChange={handleChange} disabled={!editMode} />
        </div>
        {/* Display phone */}
        <div className="form-group">
          <label>Phone:</label>
          <input type="tel" name="phone" value={profileData.phone} onChange={handleChange} disabled={!editMode} />
        </div>
        {/* Display address */}
        <div className="form-group">
          <label>Address:</label>
          <input type="text" name="address" value={profileData.address} onChange={handleChange} disabled={!editMode} />
        </div>
        {/* Display password */}
        <div className="form-group">
          <label>Password:</label>
          <div className="password-field">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={profileData.password}
              onChange={handleChange}
              disabled={!editMode}
            />
            {showPassword ? (
              <AiOutlineEyeInvisible onClick={handleTogglePassword} className="eye-icon" />
            ) : (
              <AiOutlineEye onClick={handleTogglePassword} className="eye-icon" />
            )}
          </div>
        </div>
        {/* Display buttons */}
        <div className="button-group">
          <button className="edit-button" type="button" onClick={handleEditClick}>
            {editMode ? 'Cancel' : 'Edit'}
          </button>
          {/* Display save button when in edit mode */}
          {editMode && <button className="save-button" type="submit">Save</button>}
        </div>
        <div className='button-group'>
        <button className="delete-button" type="button" onClick={handleDeleteClick}>
            Delete Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminProfile;
