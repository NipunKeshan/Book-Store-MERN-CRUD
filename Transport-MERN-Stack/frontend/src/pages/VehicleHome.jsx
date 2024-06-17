import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import BackButton from '../components/BackButton';
import './styleSheet.css';

const VehicleHome = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchKey, setSearchKey] = useState('');
  const [originalVehicles, setOriginalVehicles] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/vehicles')
      .then((response) => {
        setVehicles(response.data.data);
        setOriginalVehicles(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const searchHandle = () => {
    const filteredVehicles = originalVehicles.filter((vehicle) =>
      vehicle.vehicle.toLowerCase().includes(searchKey.toLowerCase())
    );
    setVehicles(filteredVehicles);
  };

  // Reset search
  const resetSearch = () => {
    setVehicles(originalVehicles);
    setSearchKey('');
  };

  // Format date to 'year/month/day' and time to 'hours:minutes'
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${year}/${month}/${day} ${hours}:${minutes}`;
  };

  return (
    <div style={{ padding: '2%', overflowX: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <BackButton />
        <h1 style={{ fontSize: '50px', margin: '1rem 0' }}>Vehicle List</h1>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Link to="/vehicles/create">
            <MdOutlineAddBox style={{ fontSize: '2rem', color: '#17a2b8' }} />
          </Link>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
        <input
          type="search"
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
          placeholder="Search by Vehicle"
          style={{ width: '200px', height: '35px', marginRight: '5px', padding: '0.5rem' }}
        />
        <button onClick={searchHandle} style={{ backgroundColor: '#007bff', color: '#fff', fontSize: '15px', padding: '0.5rem', marginRight: '5px', border: 'none' }}>
          Search
        </button>
        <button onClick={resetSearch} style={{ backgroundColor: '#dc3545', color: '#fff', fontSize: '15px', padding: '0.5rem', border: 'none' }}>
          Reset
        </button>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table style={{ width: '90%',marginLeft:'5%',backgroundColor:'white' }}>
          <thead>
            <tr>
              <th style={{ padding: '0.75rem 0.5rem', backgroundColor: '#6c757d', color: '#fff' }}>No</th>
              <th style={{ padding: '0.75rem 0.5rem', backgroundColor: '#6c757d', color: '#fff' }}>Year</th>
              <th style={{ padding: '0.75rem 0.5rem', backgroundColor: '#6c757d', color: '#fff' }}>Model</th>
              <th style={{ padding: '0.75rem 0.5rem', backgroundColor: '#6c757d', color: '#fff' }}>Vehicle</th>
              <th style={{ padding: '0.75rem 0.5rem', backgroundColor: '#6c757d', color: '#fff' }}>VehicleNo</th>
              <th style={{ padding: '0.75rem 0.5rem', backgroundColor: '#6c757d', color: '#fff' }}>Rentered Company</th>
              <th style={{ padding: '0.75rem 0.5rem', backgroundColor: '#6c757d', color: '#fff' }}>Rental fee</th>
              <th style={{ padding: '0.75rem 0.5rem', backgroundColor: '#6c757d', color: '#fff' }}>Capacity</th>
              <th style={{ padding: '0.75rem 0.5rem', backgroundColor: '#6c757d', color: '#fff' }}>Description</th>
              <th style={{ padding: '0.75rem 0.5rem', backgroundColor: '#6c757d', color: '#fff' }}>Time & Date</th>
              <th style={{ padding: '0.75rem 0.5rem', backgroundColor: '#6c757d', color: '#fff' }}>Opt</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle, index) => (
              <tr key={vehicle._id}>
                <td style={{ border: '1px solid #dee2e6', padding: '0.75rem 0.5rem' }}>{index + 1}</td>
                <td style={{ border: '1px solid #dee2e6', padding: '0.75rem 0.5rem' }}>{vehicle.year}</td>
                <td style={{ border: '1px solid #dee2e6', padding: '0.75rem 0.5rem' }}>{vehicle.model}</td>
                <td style={{ border: '1px solid #dee2e6', padding: '0.75rem 0.5rem' }}>{vehicle.vehicle}</td>
                <td style={{ border: '1px solid #dee2e6', padding: '0.75rem 0.5rem' }}>{vehicle.vehicleNumber}</td>
                <td style={{ border: '1px solid #dee2e6', padding: '0.75rem 0.5rem' }}>{vehicle.renteredCompany}</td>
                <td style={{ border: '1px solid #dee2e6', padding: '0.75rem 0.5rem' }}>{vehicle.rentalFee}</td>
                <td style={{ border: '1px solid #dee2e6', padding: '0.75rem 0.5rem' }}>{vehicle.capacity}</td>
                <td style={{ border: '1px solid #dee2e6', padding: '0.75rem 0.5rem' }}>{vehicle.descriptionOfVehicle}</td>
                <td style={{ border: '1px solid #dee2e6', padding: '0.75rem 0.5rem' }}>{formatDate(vehicle.createdAt)}</td>
                <td style={{ border: '1px solid #dee2e6', padding: '0.75rem 0.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                    <Link to={`/vehicles/details/${vehicle._id}`}>
                      <BsInfoCircle style={{ fontSize: '1.5rem', color: '#28a745' }} />
                    </Link>
                    <Link to={`/vehicles/edit/${vehicle._id}`}>
                      <AiOutlineEdit style={{ fontSize: '1.5rem', color: '#ffc107' }} />
                    </Link>
                    <Link to={`/vehicles/delete/${vehicle._id}`}>
                      <MdOutlineDelete style={{ fontSize: '1.5rem', color: '#dc3545' }} />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default VehicleHome;
