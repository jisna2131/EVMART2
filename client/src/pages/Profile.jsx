import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../axiosInstance";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
        setFormData(parsed);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const renderInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    try {
      const form = new FormData();
      form.append("username", formData.username);
      form.append("email", formData.email);
      form.append("phone", formData.phone || "");
      form.append("address", formData.address || "");
      if (selectedImage) {
        form.append("profileImage", selectedImage);
      }

      const response = await axios.put(`${apiUrl}api/users/${user.id}`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      localStorage.setItem("user", JSON.stringify(response.data));
      setUser(response.data);
      setEditMode(false);
      setSelectedImage(null);
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Profile update failed.");
    }
  };

  if (!user) {
    return <div className="container mt-5 text-center">No user logged in.</div>;
  }

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div
        className="card shadow-lg border-0 rounded-4 p-4"
        style={{ maxWidth: "600px", width: "100%" }}
      >
        <div className="d-flex flex-column align-items-center text-center">
          {editMode ? (
            <>
              <label htmlFor="imageUpload" className="mb-2">
                <strong>Change Profile Image:</strong>
              </label>
              <input
                type="file"
                id="imageUpload"
                className="form-control mb-3"
                accept="image/*"
                onChange={(e) => setSelectedImage(e.target.files[0])}
              />
              <img
                src={
                  selectedImage
                    ? URL.createObjectURL(selectedImage)
                    : user.profileImage
                    ? apiUrl + user.profileImage
                    : ""
                }
                alt="Preview"
                className="rounded-circle shadow mb-3"
                style={{
                  width: "140px",
                  height: "140px",
                  objectFit: "cover",
                  border: "4px solid #28a745",
                }}
              />
            </>
          ) : user.profileImage ? (
            <img
              src={apiUrl + user.profileImage}
              alt="Profile"
              className="rounded-circle shadow mb-3"
              style={{
                width: "140px",
                height: "140px",
                objectFit: "cover",
                border: "4px solid #28a745",
              }}
            />
          ) : (
            <div
              className="rounded-circle shadow mb-3 d-flex justify-content-center align-items-center"
              style={{
                width: "140px",
                height: "140px",
                backgroundColor: "#007bff",
                color: "white",
                fontSize: "36px",
                fontWeight: "bold",
                border: "4px solid #007bff",
              }}
            >
              {renderInitials(user.username)}
            </div>
          )}

          <h4 className="fw-bold">{user.username}</h4>
          <span className="text-muted text-capitalize mb-3">{user.role}</span>
          <button
            className="btn btn-sm btn-outline-primary"
            onClick={() => setEditMode(!editMode)}
          >
            {editMode ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        <hr />

        <div className="px-2">
          <div className="mb-2">
            <strong>Email:</strong>{" "}
            {editMode ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                className="form-control"
                onChange={handleChange}
              />
            ) : (
              <span className="text-secondary">{user.email}</span>
            )}
          </div>
          <div className="mb-2">
            <strong>Phone:</strong>{" "}
            {editMode ? (
              <input
                type="text"
                name="phone"
                value={formData.phone || ""}
                className="form-control"
                onChange={handleChange}
              />
            ) : (
              <span className="text-secondary">
                {user.phone || "Not provided"}
              </span>
            )}
          </div>
          <div className="mb-2">
            <strong>
              {user.role === "vendor" ? "Store Name:" : "Address:"}
            </strong>{" "}
            {editMode ? (
              <input
                type="text"
                name="address"
                value={formData.address || ""}
                className="form-control"
                onChange={handleChange}
              />
            ) : (
              <span className="text-secondary">
                {user.address || "Not provided"}
              </span>
            )}
          </div>
          {editMode && (
            <button className="btn btn-success mt-3 w-100" onClick={handleSave}>
              Save Changes
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
