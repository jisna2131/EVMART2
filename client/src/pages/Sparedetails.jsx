import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance, { apiUrl } from '../axiosInstance';

const SpareDetailsPage = () => {
  const { spareid } = useParams();
  const navigate = useNavigate();
  const [spare, setSpare] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    const fetchSpare = async () => {
      try {
        const response = await axiosInstance.get(`/customers/spare/${spareid}`);
        setSpare(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch spare part details.');
        setLoading(false);
      }
    };

    fetchSpare();
  }, [spareid]);

  const handleBuyNow = () => {
    navigate(`/payment/spare/${spareid}/${spare.price}`);
  };

  const handleAddToCart = async () => {
    setAddingToCart(true);
    try {
      await axiosInstance.post(`/cart/add`, {
        productId: spareid,
        quantity: 1,
      });
      alert('Spare part added to cart!');
    } catch (err) {
      console.error(err);
      alert('Failed to add spare part to cart.');
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) return <div className="text-center py-5">Loading...</div>;
  if (error) return <div className="text-center text-danger">{error}</div>;
  if (!spare) return <div className="text-center">Spare part not found.</div>;

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <Carousel fade>
            {spare.image.map((img, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={apiUrl + img}
                  alt={`Spare image ${index + 1}`}
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

        <div className="col-md-6 mt-4 mt-md-0">
          <div className="card shadow-lg border-light p-4">
            <h2 className="text-primary mb-3">{spare.name}</h2>
            <h4 className="text-success">${spare.price}</h4>

            <p className="text-muted"><strong>Brand:</strong> {spare.brand || 'N/A'}</p>
            <p><strong>Description:</strong> {spare.description}</p>

            <div className="d-flex gap-3 mt-4">
              <button className="btn btn-primary btn-lg" onClick={handleBuyNow}>
                Buy Now
              </button>
              {/* <button
                className="btn btn-secondary btn-lg"
                onClick={handleAddToCart}
                disabled={addingToCart}
              >
                {addingToCart ? 'Adding...' : 'Add to Cart'}
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpareDetailsPage;
