import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./navbar.css"; // Custom styles

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Load the font dynamically
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  // Get user details from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    console.log(storedUser);

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser)); // Parse user object
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    localStorage.removeItem("user"); // Remove user details
    setUser(null); // Reset state
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{
        backgroundColor: "#000",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div className="container-fluid">
        <Link
          className="navbar-brand"
          to="/"
          style={{ color: "#00FF85", fontWeight: "600" }}
        >
          EV <span style={{ color: "#FFFFFF" }}>Mart</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {/* Navigation Links */}
            {user?.role !== "admin" && user?.role !== "vendor" && (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/"
                    style={{ color: "#00FF85" }}
                  >
                    Home
                  </Link>
                </li>
              </>
            )}
            {user ? (
              <>
                {/* Admin Panel Navigation */}
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/profile"
                    style={{ color: "#00FF85" }}
                  >
                    Profile
                  </Link>
                </li>
                {user.role === "admin" && (
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/admin"
                      style={{ color: "#00FF85" }}
                    >
                      Admin Panel
                    </Link>
                  </li>
                )}
                {user.role === "user" && (
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/bookings"
                      style={{ color: "#00FF85" }}
                    >
                      Bookings
                    </Link>
                  </li>
                )}

                {/* Vendor Panel Navigation */}
                {user.role === "vendor" && (
                  <>
                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        to="/vendor"
                        style={{ color: "#00FF85" }}
                      >
                        Vendor Panel
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        to="/supplier/bookings"
                        style={{ color: "#00FF85" }}
                      >
                        Bookings
                      </Link>
                    </li>
                  </>
                )}

                <li className="nav-item">
                  <button
                    className="btn btn-link nav-link"
                    onClick={handleLogout}
                    style={{ color: "#00FF85" }}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/register"
                    style={{ color: "#00FF85" }}
                  >
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/login"
                    style={{ color: "#00FF85" }}
                  >
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
