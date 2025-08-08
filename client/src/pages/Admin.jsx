import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Analytics from "../components/Analytics";
import axiosInstance from "../axiosInstance";

const AdminPanel = () => {
  const [organisers, setOrganisers] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchOrganisers = async () => {
      try {
        const response = await axiosInstance.get("/admin/organisers");
        setOrganisers(response.data.reverse());
      } catch (err) {
        setError("Failed to fetch users");
      }
    };
    fetchOrganisers();
  }, []);

  const handleToggleVerification = async (id, isVerified) => {
    try {
      await axiosInstance.patch(`/admin/organisers/${id}/verify`);
      setSuccess(`User ${isVerified ? "unverified" : "verified"} successfully`);

      setOrganisers((prev) =>
        prev.map((org) =>
          org._id === id ? { ...org, isVerified: !org.isVerified } : org
        )
      );
    } catch (err) {
      setError(`Failed to ${isVerified ? "unverify" : "verify"} users`);
    }
  };

  const handleDeleteOrganiser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    try {
      await axiosInstance.delete(`/admin/organisers/${id}`);
      setSuccess("User deleted successfully");
      setOrganisers((prev) => prev.filter((org) => org._id !== id));
    } catch (err) {
      setError("Failed to delete user");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Admin Panel</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {/* Business Analytics Section */}
      <Analytics organisers={organisers} />

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {organisers.map((org) => (
            <tr key={org._id}>
              <td>{org.username}</td>
              <td>{org.email}</td>
              <td>{org.isVerified ? "Verified" : "Unverified"}</td>
              <td>
                <button
                  className={`btn me-2 ${
                    org.isVerified ? "btn-danger" : "btn-success"
                  }`}
                  onClick={() =>
                    handleToggleVerification(org._id, org.isVerified)
                  }
                >
                  {org.isVerified ? "Unverify" : "Verify"}
                </button>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => handleDeleteOrganiser(org._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
