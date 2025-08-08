import { useEffect, useState } from "react";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import axiosInstance, { apiUrl } from "../axiosInstance";

const SparePartsStore = () => {
  

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const navigate = useNavigate();

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get('/customers/spare'); // Replace with your endpoint
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch products');
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
  


  // Data for EV Cars
 
const handleCustomOrderClickCar = (part) => {
  navigate(`/spare/${part._id}`);
}
  


  return (
    <div className="container py-5">
      <a href="/dashboard" className="btn btn-success" style={{ marginRight: "10px", marginLeft: "auto" }}>
        Go to Vehicles
      </a>
      <h1 className="text-center mb-4">Spare Parts Store</h1>

      {/* Display Available Spare Parts in Grid Layout */}
      <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
        {products.length > 0 ? (
          products.map((part, index) => (
            <div className="col" key={index}>
              <div className="card shadow-sm">
                <img src={apiUrl + part.image[0]} alt={part.name} className="card-img-top img-fluid" />
                <div className="card-body">
                  <h5 className="card-title">{part.name}</h5>
                  <p className="card-text">{part.description}</p>
                  <p className="card-text"><strong>${part.price}</strong></p>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleCustomOrderClickCar(part)}
                  >
                    Buy
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted text-center">No spare parts available for sale.</p>
        )}
      </div>
    </div>
  );
};

export default SparePartsStore;
