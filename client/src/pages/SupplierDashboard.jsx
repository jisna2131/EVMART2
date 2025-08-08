import React from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaListAlt, FaTools, FaCar } from "react-icons/fa";

const SupplierDashboard = () => {
  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-0 rounded-4 p-5 bg-white">
        <h2 className="text-center fw-bold mb-4" style={{ color: "#009E60" }}>
          Vendor Dashboard
        </h2>
        <hr style={{ borderColor: "#009E60" }} />

        <div className="row g-4">
          {/* Add Vehicles */}
          <div className="col-md-6">
            <Link
              to="/supplier/add-product"
              className="btn w-100 py-4 fs-5 fw-bold d-flex align-items-center justify-content-center"
              style={{
                minHeight: "120px",
                backgroundColor: "white",
                color: "#009E60",
                border: "2px solid #009E60",
                transition: "0.3s",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "black";
                e.target.style.color = "#009E60";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "white";
                e.target.style.color = "#009E60";
              }}
            >
              <FaCar className="me-3" size={30} /> Add Vehicles
            </Link>
          </div>

          {/* Manage Vehicles */}
          <div className="col-md-6">
            <Link
              to="/supplier/products"
              className="btn w-100 py-4 fs-5 fw-bold d-flex align-items-center justify-content-center"
              style={{
                minHeight: "120px",
                backgroundColor: "white",
                color: "#009E60",
                border: "2px solid #009E60",
                transition: "0.3s",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "black";
                e.target.style.color = "#009E60";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "white";
                e.target.style.color = "#009E60";
              }}
            >
              <FaListAlt className="me-3" size={30} /> Manage Vehicles
            </Link>
          </div>

          {/* Add Spare Parts */}
          <div className="col-md-6">
            <Link
              to="/supplier/add-spare"
              className="btn w-100 py-4 fs-5 fw-bold d-flex align-items-center justify-content-center"
              style={{
                minHeight: "120px",
                backgroundColor: "white",
                color: "#009E60",
                border: "2px solid #009E60",
                transition: "0.3s",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "black";
                e.target.style.color = "#009E60";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "white";
                e.target.style.color = "#009E60";
              }}
            >
              <FaPlus className="me-3" size={30} /> Add Spare Parts
            </Link>
          </div>

          {/* Manage Spare Parts */}
          <div className="col-md-6">
            <Link
              to="/supplier/spare"
              className="btn w-100 py-4 fs-5 fw-bold d-flex align-items-center justify-content-center"
              style={{
                minHeight: "120px",
                backgroundColor: "white",
                color: "#009E60",
                border: "2px solid #009E60",
                transition: "0.3s",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "black";
                e.target.style.color = "#009E60";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "white";
                e.target.style.color = "#009E60";
              }}
            >
              <FaTools className="me-3" size={30} /> Manage Spare Parts
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierDashboard;
