import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance';

const AddVehicle = () => {
  const [title, setTitle] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [price, setPrice] = useState('');
  const [negotiable, setNegotiable] = useState(false);
  const [engineType, setEngineType] = useState('');
  const [displacement, setDisplacement] = useState('');
  const [mileage, setMileage] = useState('');
  const [transmission, setTransmission] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [condition, setCondition] = useState('');
  const [ownership, setOwnership] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [insuranceValidTill, setInsuranceValidTill] = useState('');
  const [locationCity, setLocationCity] = useState('');
  const [locationState, setLocationState] = useState('');
  const [description, setDescription] = useState('');
  const [colorOptions, setColorOptions] = useState([]);
  const [image, setImage] = useState([]);
  const [yearError, setYearError] = useState('');

  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const handleImageChange = (e) => {
    setImage([...e.target.files]);
  };

  const validateYear = (inputYear) => {
    const yearValue = Number(inputYear);
    if (yearValue < 1900 || yearValue > currentYear) {
      setYearError(`Please enter a valid year between 1900 and ${currentYear}`);
      return false;
    }
    setYearError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateYear(year)) {
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('brand', brand);
    formData.append('model', model);
    formData.append('year', year);
    formData.append('price', price);
    formData.append('negotiable', negotiable);
    formData.append('engineType', engineType);
    formData.append('displacement', displacement);
    formData.append('mileage', mileage);
    formData.append('transmission', transmission);
    formData.append('fuelType', fuelType);
    formData.append('condition', condition);
    if (condition === 'Used') {
      formData.append('ownership', ownership);
      formData.append('registrationNumber', registrationNumber);
    }
    formData.append('insuranceValidTill', insuranceValidTill);
    formData.append('locationCity', locationCity);
    formData.append('locationState', locationState);
    formData.append('description', description);
    colorOptions.forEach((color) => formData.append('colorOptions', color));
    image.forEach((img) => formData.append('image', img));

    try {
      const res = await axiosInstance.post('/vendor/vehicles', formData);
      console.log(res.data);
      
      navigate('/vendor');
    } catch (err) {
      console.error('Error adding vehicle:', err);
      alert('Failed to add vehicle.');
    }
  };

  return (
    <div className="container my-5">
      <button className="btn btn-secondary mb-3" onClick={() => navigate('/vendor')}>
        Back to Dashboard
      </button>
      <h2>Add Vehicle</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Brand</label>
          <input type="text" className="form-control" value={brand} onChange={(e) => setBrand(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Model</label>
          <input type="text" className="form-control" value={model} onChange={(e) => setModel(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Year</label>
          <input
            type="number"
            className="form-control"
            value={year}
            onChange={(e) => {
              setYear(e.target.value);
              validateYear(e.target.value);
            }}
            required
          />
          {yearError && <small className="text-danger">{yearError}</small>}
        </div>
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input type="number" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Condition</label>
          <select className="form-control" value={condition} onChange={(e) => setCondition(e.target.value)} required>
            <option value="">Select Condition</option>
            <option value="New">New</option>
            <option value="Used">Used</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Image Upload</label>
          <input type="file" className="form-control" multiple onChange={handleImageChange} />
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-primary">Add Vehicle</button>
        </div>
      </form>
    </div>
  );
};

export default AddVehicle;
