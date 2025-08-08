import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';
import { useNavigate } from 'react-router-dom';

const VendorRegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
    storeName: '',
    profileImage: null, // Added profile image field
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profileImage: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      const response = await axiosInstance.post('/register/vendor', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setMessage(response.data.message);
      setTimeout(() => navigate('/login'), 1000);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
      setMessage('');
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center">
      <div className="row w-100">
        {/* Left side: Image */}
        <div className="col-md-6 d-none d-md-block">
          <img
            src="/elec.jpg"
            alt="Vendor Registration"
            className="img-fluid h-100 w-100 object-cover rounded-3 shadow-sm"
          />
        </div>

        {/* Right side: Register form */}
        <div className="col-md-6 d-flex justify-content-center align-items-center" style={{ backgroundColor: '#f8f9fa' }}>
          <div className="card shadow-lg border-0 rounded-4 p-5" style={{ width: '100%', maxWidth: '450px' }}>
            <h2 className="text-center mb-4" style={{ color: '#333' }}>Register as Vendor</h2>
            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}
            
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              {/* Profile Image Upload */}
              <div className="mb-4 text-center">
                <label htmlFor="profileImage">
                  <input type="file" id="profileImage" accept="image/*" onChange={handleFileChange} hidden />
                  {previewImage ? (
                    <img src={previewImage} alt="Profile Preview" className="rounded-circle shadow" style={{ width: "100px", height: "100px", objectFit: "cover", cursor: "pointer" }} />
                  ) : (
                    <div className="border rounded-circle p-2 text-center" style={{ width: "100px", height: "100px", lineHeight: "90px", backgroundColor: "#eee", cursor: "pointer" }}>
                      Upload Photo
                    </div>
                  )}
                </label>
              </div>

              {/* Username */}
              <div className="mb-4">
                <label className="form-label" style={{ color: '#333' }}>Username</label>
                <input type="text" className="form-control" name="username" value={formData.username} onChange={handleChange} placeholder="Enter your username" required />
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className="form-label" style={{ color: '#333' }}>Email</label>
                <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required />
              </div>

              {/* Password with Toggle */}
              <div className="mb-4 position-relative">
                <label className="form-label" style={{ color: '#333' }}>Password</label>
                <input type={showPassword ? "text" : "password"} className="form-control" name="password" value={formData.password} onChange={handleChange} placeholder="Create a password" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="btn btn-sm btn-light position-absolute" style={{ right: "10px", top: "50%", transform: "translateY(-50%)" }}>
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              {/* Phone */}
              <div className="mb-4">
                <label className="form-label" style={{ color: '#333' }}>Phone</label>
                <input type="text" className="form-control" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter your phone number" required />
              </div>

              {/* Store Name */}
              <div className="mb-4">
                <label className="form-label" style={{ color: '#333' }}>Store Name</label>
                <input type="text" className="form-control" name="storeName" value={formData.storeName} onChange={handleChange} placeholder="Enter your store name" required />
              </div>

              {/* Register Button */}
              <button type="submit" className="btn w-100 btn-primary py-2" style={{ fontSize: '1.1rem', fontWeight: '600' }}>
                Register as Vendor
              </button>

              {/* Login and User Register Links */}
              <div className="text-center mt-3">
                <small>
                  Already have an account?{' '}
                  <a href="/login" style={{ color: '#007bff' }}>Login here</a>
                </small>
              </div>

              <div className="text-center mt-2">
                <small>
                  Not a vendor? <a href="/register" style={{ color: '#007bff' }}>Register as User</a>
                </small>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorRegisterPage;
