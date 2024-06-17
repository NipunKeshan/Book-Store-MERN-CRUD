import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { BsInfoCircle } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import { BsTaxiFrontFill } from 'react-icons/bs';
import NavigationBar from '../components/NavigationBar';
import './Home.css';
import TransportFinancial from './TransportFinancial';
import './styleSheet.css';

const Home = () => {
  const componentPDF = useRef();
  const [transports, setTransports] = useState([]);
  const [originalTransports, setOriginalTransports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchkey, setSearchKey] = useState('');
  const [vehicleFilter, setVehicleFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/transports')
      .then((response) => {
        setTransports(response.data.data);
        setOriginalTransports(response.data.data); 
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  
  const searchHandle = () => {
    transportationData(searchkey);
  };

  const transportationData = (searchkey) => {
    const transportationData = originalTransports.filter((transport) =>
      transport.vehicle.toLowerCase().includes(searchkey.toLowerCase())
    );
    setTransports(transportationData);
  };

  
  const resetSearch = () => {
    setTransports(originalTransports);
    setSearchKey('');
  };

  
  const filterByVehicle = () => {
    const filteredData = originalTransports.filter((transport) =>
      transport.vehicle.toLowerCase().includes(vehicleFilter.toLowerCase())
    );
    setTransports(filteredData);
  };

 
  const filterByDate = () => {
    const filteredData = originalTransports.filter((transport) =>
      transport.date.includes(dateFilter)
    );
    setTransports(filteredData);
  };

 
  const resetFilters = () => {
    setVehicleFilter('');
    setDateFilter('');
    setTransports(originalTransports);
  };

 
  return (
    <div style={{ padding: '30px' }}>
      <NavigationBar /><br />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '25px' }}>Manage All The Transportation Here ,</h2>
        <div style={{ display: 'flex', gap: '4px' }}>
          <Link to="/transports/create">
            <MdOutlineAddBox style={{ color: 'black', fontSize: '40px' }} />
          </Link>
          <Link to="/vehicles">
            <BsTaxiFrontFill style={{ color: 'black', fontSize: '40px' }} />
          </Link>
        </div>
      </div>
  
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
          id="searchPlaceHolder"
          className="form-control"
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          type="search"
          value={searchkey}
          onChange={(e) => setSearchKey(e.target.value)}
          placeholder="Search by Vehicle"
          style={{ width: '200px', height: '35px', marginRight: '5px' }}
        />
        <button
          id="search-btn"
          onClick={searchHandle}
          style={{ fontSize: '15px', marginRight: '5px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '5px', padding: '5px 10px' }}
        >
          Search
        </button>
        <button
          onClick={resetSearch}
          style={{ fontSize: '15px', backgroundColor: '#DC3545', color: '#fff', border: 'none', borderRadius: '5px', padding: '5px 10px' }}
        >
          Reset
        </button>
  
        <select
          value={vehicleFilter}
          onChange={(e) => setVehicleFilter(e.target.value)}
          style={{ width: '150px', marginLeft: '450px' }}
          className="form-control"
        >
          <option value="">Filter by vehicle</option>
          {transports.map((transport) => (
            <option key={transport._id} value={transport.vehicle}>
              {transport.vehicle}
            </option>
          ))}
        </select>
        <button onClick={filterByVehicle} style={{ marginRight: '5px' }}></button>
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          style={{ marginRight: '5px', width: '150px' }}
          className="form-control"
        />
        <button onClick={filterByDate} style={{ marginRight: '5px', color: '#fff', backgroundColor: '#FFC107', border: 'none', borderRadius: '5px', padding: '5px 10px' }}> Filter</button>
        <button onClick={resetFilters} style={{ backgroundColor: '#6C757D', color: '#fff', border: 'none', borderRadius: '5px', padding: '5px 10px' }}>Reset</button>
      </div>
  
      <br />
      <div>
        <Link to="/financial">
          <button style={{ backgroundColor: '#28A745', color: '#fff', border: 'none', borderRadius: '5px', padding: '5px 10px' }}>Go to Transport Report Page</button>
        </Link>
      </div>
      <div>
  
      </div>
      <br />
  
      {loading ? (
        <Spinner />
      ) : (
        <div ref={componentPDF} style={{ width: '80%' }}>
          <table style={{ width: '100%', backgroundColor: 'white', margin: 'auto',marginLeft:'10%' }}>
            <thead>
              <tr style={{ backgroundColor: '#a2b9bc' }}>
                <th style={{ border: '1px solid black', padding: '10px' }}>No</th>
                <th style={{ border: '1px solid black', padding: '10px' }}>Job</th>
                <th style={{ border: '1px solid black', padding: '10px' }}>Vehicle</th>
                <th style={{ border: '1px solid black', padding: '10px' }}>VehicleNo</th>
                <th style={{ border: '1px solid black', padding: '10px' }}>Driver</th>
                <th style={{ border: '1px solid black', padding: '10px' }}>Date</th>
                <th style={{ border: '1px solid black', padding: '10px' }}>Time</th>
                <th style={{ border: '1px solid black', padding: '10px' }}>Cost</th>
                <th style={{ border: '1px solid black', padding: '10px' }}>Destination</th>
                <th style={{ border: '1px solid black', padding: '10px' }}>Opt</th>
              </tr>
            </thead>
            <tbody>
              {transports.map((transport, index) => (
                <tr key={transport._id}>
                  <td style={{ border: '1px solid black', padding: '10px' }}>{index + 1}</td>
                  <td style={{ border: '1px solid black', padding: '10px' }}>{transport.job}</td>
                  <td style={{ border: '1px solid black', padding: '10px' }}>{transport.vehicle}</td>
                  <td style={{ border: '1px solid black', padding: '10px' }}>{transport.vehicleNumber}</td>
                  <td style={{ border: '1px solid black', padding: '10px' }}>{transport.driver}</td>
                  <td style={{ border: '1px solid black', padding: '10px' }}>
                    {new Date(transport.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    })}
                  </td>
                  <td style={{ border: '1px solid black', padding: '10px' }}>{transport.time}</td>
                  <td style={{ border: '1px solid black', padding: '10px' }}>{transport.cost}</td>
                  <td style={{ border: '1px solid black', padding: '10px' }}>{transport.description}</td>
                  <td style={{ border: '1px solid black', padding: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '4px' }}>
                      <Link to={`/transports/details/${transport._id}`}>
                        <BsInfoCircle style={{ fontSize: '20px', color: '#008000' }} />
                      </Link>
                      <Link to={`/transports/edit/${transport._id}`}>
                        <AiOutlineEdit style={{ fontSize: '20px', color: '#FFD700' }} />
                      </Link>
                      <Link to={`/transports/delete/${transport._id}`}>
                        <MdOutlineDelete style={{ fontSize: '20px', color: '#FF4500' }} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <br></br><br></br><br></br>
          <h1 style={{ fontSize: '25px' }}>Transportation Summary</h1><br></br>
          <table style={{ borderCollapse: 'collapse',backgroundColor:'white', width: '50%', border: '1px solid black',marginLeft:'25%' ,textAlign:'center'}}>
  <tr style={{ backgroundColor: '#a2b9bc' }}>
    <th style={{ border: '1px solid black', padding: '10px' }}>Total Transportations</th>
    <th style={{ border: '1px solid black', padding: '10px' }}>Total Vehicles</th>
  </tr>
  <tr>
    <td style={{ border: '1px solid black', padding: '10px' }}>{transports.length}</td>
    <td style={{ border: '1px solid black', padding: '10px' }}>15</td>
  </tr>
</table>

        </div>
      
      )}
    </div>

  );
  
};

export default Home;
