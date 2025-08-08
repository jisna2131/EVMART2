import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axiosInstance, { apiUrl } from "../axiosInstance";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get("/customers/vehicles"); // Replace with your endpoint
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch products");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Render loading state
  if (loading) {
    return <div>Loading products...</div>;
  }

  // Render error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Render product grid
  console.log(products);

  // Navigate to product details page
  const handleLearnMoreClickCar = (car) => {
    navigate(`/item/${car._id}`);
  };

  // Data for EV Cars

  const handleCustomOrderClickCar = (car) => {
    navigate(`/item/${car._id}`);
  };

  return (
    <div className="bg-light text-dark">
      <a
        href="/buy"
        className="btn btn-success"
        style={{ margin: "10px 10px 0 10px" }}
      >
        Go to Spare Page
      </a>
      <div className="text-center py-5">
        <h1 className="display-4 fw-bold">Explore Electric Vehicles</h1>
        <p className="lead">Innovative, Sustainable, and High-Performance.</p>
      </div>

      <div className="container my-6">
        <h2 className="text-center mb-4">Electric Cars</h2>
        <div className="row">
          {products.map((car) => (
            <div className="col-md-4 mb-5" key={car._id}>
              <div
                className="card h-100 text-white"
                style={{ overflow: "hidden", borderRadius: "5px" }}
              >
                <div
                  className="ratio ratio-4x3"
                  style={{
                    backgroundImage: `url(${
                      apiUrl + car.image[0] || "https://via.placeholder.com/150"
                    })`,
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    borderRadius: "5px",
                    transition: "transform 0.5s ease-in-out",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <img src={apiUrl + car.image[0]} alt="" />
                  <div
                    className="d-flex flex-column justify-content-end h-100 p-3"
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.47)",
                      borderRadius: "10px",
                    }}
                  >
                    <h5 className="fw-bold">{car.name}</h5>
                    <p>{car.description}</p>
                    <p className="h6">{car.price}</p>
                    <div className="d-flex flex-column">
                      {/* <Button
                        variant="light"
                        size="sm"
                        className="mb-2"
                        onClick={() => handleCustomOrderClickCar(car)}
                      >
                        Custom Order
                      </Button> */}
                      <Button
                        variant="outline-light"
                        size="sm"
                        onClick={() => handleLearnMoreClickCar(car)}
                      >
                        Learn More
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
