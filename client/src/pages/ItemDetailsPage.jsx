import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance, { apiUrl } from '../axiosInstance';

const ItemDetailsPage = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await axiosInstance.get(`/customers/vehicles/${itemId}`);
        setVehicle(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch vehicle details.');
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [itemId]);

  const handleBuyNow = () => {
    navigate(`/payment/${itemId}/${vehicle.price}`);
  };

  if (loading) return <div className="text-center py-5">Loading...</div>;
  if (error) return <div className="text-center text-danger">{error}</div>;
  if (!vehicle) return <div className="text-center">Vehicle not found.</div>;

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        {/* Image Carousel */}
        <div className="col-md-6">
  <Carousel fade>
    {vehicle.image.map((img, index) => (
      <Carousel.Item key={index}>
        <img
          className="d-block w-100"
          src={apiUrl + img}
          alt={`Vehicle image ${index + 1}`}
          style={{
            height: '400px',
            objectFit: 'cover',
            borderRadius: '12px',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
          }}
        />
      </Carousel.Item>
    ))}
  </Carousel>
</div>


        {/* Vehicle Details */}
        <div className="col-md-6 mt-4 mt-md-0">
          <div className="card shadow-lg border-light p-4">
            <h2 className="text-primary mb-3">{vehicle.title}</h2>
            <h4 className="text-success">
              ${vehicle.price.toLocaleString()} {vehicle.negotiable && <span className="text-muted">(Negotiable)</span>}
            </h4>

            <div className="mb-3">
              <p><strong>Brand:</strong> {vehicle.brand}</p>
              <p><strong>Model:</strong> {vehicle.model}</p>
              <p><strong>Year:</strong> {vehicle.year}</p>
              <p><strong>Condition:</strong> {vehicle.condition}</p>
            </div>

            <div className="mb-3">
              <p><strong>Created At:</strong> {new Date(vehicle.createdAt).toLocaleDateString()}</p>
            </div>

            <div className="d-flex gap-3 mt-4">
              <button className="btn btn-primary btn-lg" onClick={handleBuyNow}>
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailsPage;
