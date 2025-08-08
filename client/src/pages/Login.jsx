import React, { useState } from "react";
import axiosInstance from "../axiosInstance";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/login", formData);
      setMessage(response.data.message);
      setError("");

      if (response.data.user.role === "admin") {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        navigate("/admin");
      } else if (response.data.user.role === "vendor") {
        if (response.data.user.isVerified) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));

          navigate("/vendor");
        } else {
          setMessage("Please verify your email first.");
        }
      } else {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        navigate("/dashboard");
      }

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
      setMessage("");
    }
  };

  // Forgot Password Functions
  const handleForgotPassword = async () => {
    try {
      const response = await axiosInstance.post("/forgot-password", {
        email: resetEmail,
      });
      setResetMessage(
        response.data.message || "Check your email for reset instructions."
      );
      setResetEmail("");
    } catch (err) {
      setResetMessage(
        err.response?.data?.message || "Failed to send reset email."
      );
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center">
      <div className="row w-100">
        {/* Left side: Image */}
        <div className="col-md-6 d-none d-md-block">
          <img
            src="/login.png" // Make sure the image is available in the public folder or assets
            alt="Login Theme"
            className="img-fluid h-100 w-100 object-cover rounded-3 shadow-sm"
          />
        </div>

        {/* Right side: Login Form */}
        <div className="col-md-6 d-flex justify-content-center align-items-center bg-light">
          <div
            className="card border-0 shadow-lg p-5 rounded-4"
            style={{ width: "100%", maxWidth: "450px" }}
          >
            <h2 className="text-center" style={{ color: "#00d33b" }}>
              Login
            </h2>
            <p className="text-center text-muted mb-4">Access your account</p>

            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
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
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                />
                {/* <div className="text-end mt-1">
                  <button
                    type="button"
                    className="btn btn-link p-0"
                    style={{ color: "#00d33b", textDecoration: "none" }}
                    onClick={() => setShowForgotPassword(true)}
                  >
                    Forgot Password?
                  </button>
                </div> */}
              </div>

              <button
                type="submit"
                className="btn w-100"
                style={{ backgroundColor: "#00d33b", color: "white" }}
              >
                Login
              </button>
            </form>

            <div className="text-center mt-3">
              <small className="text-muted">
                Don't have an account?
                <a
                  href="/register"
                  style={{
                    color: "#00d33b",
                    textDecoration: "none",
                    marginLeft: "5px",
                  }}
                >
                  Sign Up
                </a>
              </small>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <Modal
        show={showForgotPassword}
        onHide={() => setShowForgotPassword(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Password Reset</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {resetMessage ? (
            <div className="alert alert-success">{resetMessage}</div>
          ) : (
            <>
              <p>
                Enter your email address, and we'll send you a password reset
                link.
              </p>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                required
              />
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          {!resetMessage && (
            <Button
              variant="success"
              onClick={handleForgotPassword}
              style={{ backgroundColor: "#00d33b" }}
            >
              Send Reset Link
            </Button>
          )}
          <Button
            variant="secondary"
            onClick={() => setShowForgotPassword(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Login;
