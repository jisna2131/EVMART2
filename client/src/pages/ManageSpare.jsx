import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axiosInstance from '../axiosInstance';

const ManageSpare = () => {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVehicles = async () => {
      const response = await axiosInstance.get('/vendor/spare');
      console.log(response.data);
      
      setVehicles(response.data);
    };
    fetchVehicles();
  }, []);

  const handleDelete = async (vehicleId) => {
    await axiosInstance.delete(`/vendor/spare/${vehicleId}`);
    const response = await axiosInstance.get('/vendor/spare');
    setVehicles(response.data);
  };

  const handleShowDetails = (vehicle) => {
    setSelectedVehicle(vehicle);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedVehicle(null);
  };

  return (
    <div className="manage-spare parts p-4">
      <button className="btn btn-secondary mb-3" onClick={() => navigate('/vendor')}>
        Back to Dashboard
      </button>
      <h2>Manage spare parts</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Brand</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle._id}>
              <td>{vehicle.name}</td>
              <td>{vehicle.brand}</td>
              <td>${vehicle.price}</td>
             
              <td>
                <button className="btn btn-info me-2" onClick={() => handleShowDetails(vehicle)}>
                  View Details
                </button>
                <button className="btn btn-danger" onClick={() => handleDelete(vehicle._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedVehicle && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Spare Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Title:</strong> {selectedVehicle.name}</p>
            <p><strong>Brand:</strong> {selectedVehicle.brand}</p>
            <p><strong>Price:</strong> ${selectedVehicle.price}</p>
            <p><strong>Verified:</strong> {selectedVehicle.isVerified ? 'Yes' : 'No'}</p>
            {selectedVehicle.image && selectedVehicle.image.length > 0 && (
              <div>
                <strong>Images:</strong>
                <div>
                  {selectedVehicle.image.map((img, index) => (
                    <img
                      key={index}
                      src={`http://localhost:7000/${img}`}
                      alt={`${selectedVehicle.title}-${index}`}
                      style={{ width: '100%', marginBottom: '10px' }}
                    />
                  ))}
                </div>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default ManageSpare;
