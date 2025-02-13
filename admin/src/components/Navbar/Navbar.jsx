import React, { useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets'; // Assuming assets import is correctly configured

const Navbar = () => {
  const [selectedFile, setSelectedFile] = useState(null); // State to hold selected file
  const [adminName, setAdminName] = useState('Adishree'); // State to hold admin name, defaulting to 'Adishree' (initial capitalization)
  const [editMode, setEditMode] = useState(false); // State to track if in edit mode for admin name
  const profileImage = selectedFile ? URL.createObjectURL(selectedFile) : assets.profile_image; // Use selected file if available, else default profile image

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleNameChange = (event) => {
    setAdminName(event.target.value); // Update adminName state with the entered value
  };

  const handleNameSubmit = () => {
    setEditMode(false); // Exit edit mode after submitting
  };

  const handleNameClick = () => {
    setEditMode(true); // Enter edit mode when admin name is clicked
  };

  return (
    <div className='navbar'>
      <div className="part">
        <img className='logo' src={assets.cake_icon} alt="" /> 
        <h3>Admin Panel</h3>
      </div>
      <div className="profile-section">
        <label htmlFor="file-upload" className="file-upload-label">
          <img className='profile' src={profileImage} alt="Profile" />
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </label>
        {editMode ? (
          <input
            type="text"
            value={adminName}
            onChange={handleNameChange}
            onBlur={handleNameSubmit}
            className="admin-name-input"
            autoFocus
          />
        ) : (
          <span className="admin-name" onClick={handleNameClick}>{adminName}</span>
        )}
      </div>
    </div>
  );
};

export default Navbar;
