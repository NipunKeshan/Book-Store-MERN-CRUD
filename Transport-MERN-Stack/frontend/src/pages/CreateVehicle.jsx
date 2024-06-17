import React, { useState } from 'react';
import BackButton2 from '../components/BackButton2';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateVehicle = () => {
  const [year, setYear] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [renteredCompany, setRenteredCompany] = useState('');
  const [rentalFee, setRentalFee] = useState('');
  const [capacity, setCapacity] = useState('');
  const [capacityPrefix, setCapacityPrefix] = useState('Passengers'); 
  const [model, setModel] = useState('');
  const [descriptionOfVehicle, setDescriptionOfVehicle] = useState('');
  const [loading, setLoading] = useState(false);
  const [vehicleNumberError, setVehicleNumberError] = useState('');
  const [rentalFeeError, setRentalFeeError] = useState('');
  const [yearError, setYearError] = useState('');
  const [capacityError, setCapacityError] = useState('');
  const navigate = useNavigate();

  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear; i >= currentYear - 50; i--) {
      years.push(i);
    }
    return years;
  };

  const isValidVehicleNumber = (input) => {
    const regex = /^[A-Z0-9]{2,3}-\d{4}$/;
    return regex.test(input);
  };

  const handleSaveVehicle = () => {
    const inputYear = parseInt(year);
    const currentYear = new Date().getFullYear();

    if (isNaN(inputYear) || inputYear < 1000 || inputYear > currentYear) {
      alert('Invalid year input. Please enter a valid year.');
      return;
    }

    if (inputYear > currentYear) {
      setYearError('Year cannot be a future year.');
      return;
    }

    setYearError('');

    if (!isValidVehicleNumber(vehicleNumber)) {
      setVehicleNumberError('Invalid Number Plate. Valid: ABC - 9987');
      return;
    }

    const rentalFeeValue = parseFloat(rentalFee);
    if (isNaN(rentalFeeValue) || rentalFeeValue <= 0) {
      setRentalFeeError('Rental Fee must be a valid number greater than 0.');
      return;
    }

    const capacityValue = parseInt(capacity);
    if (isNaN(capacityValue) || capacityValue <= 0) {
      setCapacityError('Capacity must be a positive integer.');
      return;
    }

    setLoading(true);

    const data = {
      year: inputYear,
      vehicle,
      vehicleNumber,
      renteredCompany,
      rentalFee: rentalFeeValue,
      capacity: `${capacityPrefix} ${capacity}`,
      model,
      descriptionOfVehicle,
    };

    axios
      .post('http://localhost:5555/vehicles', data)
      .then(() => {
        setLoading(false);
        navigate('/vehicles');
      })
      .catch((error) => {
        setLoading(false);
        alert('An error occurred. Please check the console for details.');
        console.error('Error saving vehicle:', error);
      });
  };

  const handleVehicleNumberBlur = (e) => {
    const input = e.target.value;
    if (!isValidVehicleNumber(input)) {
      setVehicleNumberError('Invalid Number Plate. Valid: ABC - 9987');
    } else {
      setVehicleNumberError('');
    }
  };

  const handleRentalFeeBlur = (e) => {
    const input = e.target.value;
    const rentalFeeValue = parseFloat(input);
    if (isNaN(rentalFeeValue) || rentalFeeValue <= 0) {
      setRentalFeeError('Rental Fee must be a valid number greater than 0.');
    } else {
      setRentalFeeError('');
    }
  };

  const handleCapacityBlur = (e) => {
    const input = e.target.value;
    const capacityValue = parseInt(input);
    if (isNaN(capacityValue) || capacityValue <= 0) {
      setCapacityError('Capacity must be a positive integer.');
    } else {
      setCapacityError('');
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <BackButton2 />
      <h1 style={{ fontSize: '1.5rem', margin: '1rem 0' }}>Create Vehicle Log</h1>
      {loading && <Spinner />}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ border: '3px solid black', padding: '10px', borderRadius: '10px', backgroundColor: 'white' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            <div style={{ margin: '1rem 0' }}>
              <label style={{ fontSize: '1rem', marginRight: '0.5rem', color: '#555' }}>Year</label>
              <input
                type="date"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                style={{ border: '2px solid #888', padding: '0.5rem', width: '100%' }}
              />
              {yearError && (
                <p style={{ color: 'red' }}>{yearError}</p>
              )}
            </div>
            <div style={{ margin: '1rem 0' }}>
              <label style={{ fontSize: '1rem', marginRight: '0.5rem', color: '#555' }}>Model</label>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                style={{ border: '2px solid #888', padding: '0.5rem', width: '100%' }}
              >
                <option value="">Select a model</option>
                <option value="Car">Car</option>
                <option value="Bike">Bike</option>
                <option value="Van">Van</option>
                <option value="Truck">Truck</option>
                <option value="Cab">Cab</option>
                <option value="Bus">Bus</option>
              </select>
            </div>
            <div style={{ margin: '1rem 0' }}>
              <label style={{ fontSize: '1rem', marginRight: '0.5rem', color: '#555' }}>Vehicle</label>
              <input
                type="text"
                value={vehicle}
                onChange={(e) => setVehicle(e.target.value)}
                style={{ border: '2px solid #888', padding: '0.5rem', width: '100%' }}
              />
            </div>
            <div style={{ margin: '1rem 0' }}>
              <label style={{ fontSize: '1rem', marginRight: '0.5rem', color: '#555' }}>VehicleNo</label>
              <input
                type="text"
                value={vehicleNumber}
                onBlur={handleVehicleNumberBlur}
                onChange={(e) => setVehicleNumber(e.target.value)}
                style={{ border: '2px solid #888', padding: '0.5rem', width: '100%' }}
              />
              {vehicleNumberError && (
                <p style={{ color: 'red' }}>{vehicleNumberError}</p>
              )}
            </div>
            <div style={{ margin: '1rem 0' }}>
              <label style={{ fontSize: '1rem', marginRight: '0.5rem', color: '#555' }}>Capacity</label>
              <select
                value={capacityPrefix}
                onChange={(e) => setCapacityPrefix(e.target.value)}
                style={{ border: '2px solid #888', padding: '0.5rem', width: '100%' }}
              >
                <option value="Passengers">Passengers</option>
                <option value="TON">TON</option>
              </select>
              <input
                type="text"
                value={capacity}
                onBlur={handleCapacityBlur}
                onChange={(e) => setCapacity(e.target.value)}
                style={{ border: '2px solid #888', padding: '0.5rem', width: '100%', marginTop: '0.5rem' }}
              />
              {capacityError && (
                <p style={{ color: 'red' }}>{capacityError}</p>
              )}
            </div>
            <div style={{ margin: '1rem 0' }}>
              <label style={{ fontSize: '1rem', marginRight: '0.5rem', color: '#555' }}>Rented Company</label>
              <input
                type="text"
                value={renteredCompany}
                onChange={(e) => setRenteredCompany(e.target.value)}
                style={{ border: '2px solid #888', padding: '0.5rem', width: '100%' }}
              />
            </div>
            <div style={{ margin: '1rem 0' }}>
              <label style={{ fontSize: '1rem', marginRight: '0.5rem', color: '#555' }}>Rental Fee</label>
              <input
                type="text"
                value={rentalFee}
                onBlur={handleRentalFeeBlur}
                onChange={(e) => setRentalFee(e.target.value)}
                style={{ border: '2px solid #888', padding: '0.5rem', width: '100%' }}
              />
              {rentalFeeError && (
                <p style={{ color: 'red' }}>{rentalFeeError}</p>
              )}
            </div>
            <div style={{ margin: '1rem 0', gridColumn: 'span 3' }}>
              <label style={{ fontSize: '1rem', marginRight: '0.5rem', color: '#555' }}>Description</label>
              <textarea
                value={descriptionOfVehicle}
                onChange={(e) => setDescriptionOfVehicle(e.target.value)}
                style={{ border: '2px solid #888', padding: '0.5rem', width: '100%', height: '8rem' }}
              />
            </div>
          </div>
          <button style={{ padding: '0.5rem 1rem', backgroundColor: '#add8e6', margin: '0.5rem 2rem', alignSelf: 'start' }} onClick={handleSaveVehicle}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateVehicle;
