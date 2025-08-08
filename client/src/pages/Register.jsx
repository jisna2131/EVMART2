import React, { useState } from "react";
import axiosInstance from "../axiosInstance";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    profileImage: null,
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!allowedTypes.includes(file.type)) {
        setErrors((prev) => ({
          ...prev,
          profileImage: "Only JPG, JPEG, and PNG formats are allowed",
        }));
        return;
      } else {
        setErrors((prev) => ({ ...prev, profileImage: "" }));
      }
    }

    setFormData({ ...formData, profileImage: file });
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.username || formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.password || formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.phone || !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }

    if (!formData.address || formData.address.trim() === "") {
      newErrors.address = "Address cannot be empty";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("username", formData.username);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("address", formData.address);
      if (formData.profileImage) {
        formDataToSend.append("profileImage", formData.profileImage);
      }

      const response = await axiosInstance.post(
        "/register/user",
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setMessage(response.data.message);
      setTimeout(() => navigate("/login"), 1000);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
      setMessage("");
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center">
      <div className="row w-100">
        {/* Left side: Image */}
        <div className="col-md-6 d-none d-md-block">
          <img
            src="/elec.jpg"
            alt="VC Theme"
            className="img-fluid h-100 w-100 object-cover rounded-3 shadow-sm"
          />
        </div>

        {/* Right side: Register form */}
        <div
          className="col-md-6 d-flex justify-content-center align-items-center"
          style={{ backgroundColor: "#f8f9fa" }}
        >
          <div
            className="card shadow-lg border-0 rounded-4 p-5"
            style={{ width: "100%", maxWidth: "450px" }}
          >
            <h2 className="text-center mb-4" style={{ color: "#333" }}>
              Create an Account
            </h2>
            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              {/* Username */}
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="form-label"
                  style={{ color: "#333" }}
                >
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  required
                />
                {errors.username && (
                  <small className="text-danger">{errors.username}</small>
                )}
              </div>

              {/* Email */}
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="form-label"
                  style={{ color: "#333" }}
                >
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
                {errors.email && (
                  <small className="text-danger">{errors.email}</small>
                )}
              </div>

              {/* Password */}
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="form-label"
                  style={{ color: "#333" }}
                >
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  required
                />
                {errors.password && (
                  <small className="text-danger">{errors.password}</small>
                )}
              </div>

              {/* Phone */}
              <div className="mb-4">
                <label
                  htmlFor="phone"
                  className="form-label"
                  style={{ color: "#333" }}
                >
                  Phone
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  required
                />
                {errors.phone && (
                  <small className="text-danger">{errors.phone}</small>
                )}
              </div>

              {/* Address */}
              <div className="mb-4">
                <label
                  htmlFor="address"
                  className="form-label"
                  style={{ color: "#333" }}
                >
                  Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your address"
                  required
                />
                {errors.address && (
                  <small className="text-danger">{errors.address}</small>
                )}
              </div>

              {/* Profile Image */}
              <div className="mb-4">
                <label
                  htmlFor="profileImage"
                  className="form-label"
                  style={{ color: "#333" }}
                >
                  Profile Image
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="profileImage"
                  name="profileImage"
                  onChange={handleFileChange}
                  accept="image/*"
                />
                {errors.profileImage && (
                  <small className="text-danger">{errors.profileImage}</small>
                )}
              </div>

              <button type="submit" className="btn w-100 btn-primary py-2">
                Register
              </button>
              {/* create vendor account
               */}

              <p className="text-center mt-3">
                register as a vendor? <Link to="/vendorregister">Register</Link>
              </p>
              <p className="text-center mt-3">
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
