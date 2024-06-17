import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { useReactToPrint } from 'react-to-print';
import './styleSheet.css';
import logo from'../images/logo.png';

const TransportFinancial = () => {
  const componentPDF = useRef();
  const [transports, setTransports] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/transports')
      .then((response) => {
        setTransports(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: 'Transportation Log',
    onAfterPrint: () => alert('Data saved in PDF'),
    pageStyle: '@media print { body { -webkit-print-color-adjust: exact; color-adjust: exact; } }',
  });

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <h2 style={{ fontSize: '25px' }}>Transportation Log Page</h2>
      </div>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <button onClick={generatePDF} style={{ backgroundColor: '#17a2b8', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.5rem' }}>
          Generate PDF
        </button>
      </div>

      <br />

      {loading ? (
        <Spinner />
      ) : (
        <div ref={componentPDF} style={{  }}>
          <h1 style={{ textAlign: 'center' }}>Seylin Garment Management System</h1>
          <h1 style={{ textAlign: 'center' }}>Monthly Log Report</h1>
          <h1 style={{ textAlign: 'center' }}>2024/05/16</h1>
          <img src={logo} alt="Logo" style={{ width: '100px', height: 'auto',marginLeft:'45%' }} />
          <br />
          <table style={{ width: '80%', backgroundColor: 'white' }}>
            <thead>
              <tr style={{ backgroundColor: '#a2b9bc' }}>
                <th style={{ border: '1px solid black', padding: '0.5rem' }}>No</th>
                <th style={{ border: '1px solid black', padding: '0.5rem' }}>Job</th>
                <th style={{ border: '1px solid black', padding: '0.5rem' }}>Vehicle</th>
                <th style={{ border: '1px solid black', padding: '0.5rem' }}>VehicleNo</th>
                <th style={{ border: '1px solid black', padding: '0.5rem' }}>Driver</th>
                <th style={{ border: '1px solid black', padding: '0.5rem' }}>Date</th>
                <th style={{ border: '1px solid black', padding: '0.5rem' }}>Time</th>
                <th style={{ border: '1px solid black', padding: '0.5rem' }}>Cost</th>
                <th style={{ border: '1px solid black', padding: '0.5rem' }}>Destination</th>
              </tr>
            </thead>
            <tbody>
              {transports.map((transport, index) => (
                <tr key={transport._id}>
                  <td style={{ border: '1px solid black', padding: '0.5rem' }}>
                    {index + 1}
                  </td>
                  <td style={{ border: '1px solid black', padding: '0.5rem' }}>{transport.job}</td>
                  <td style={{ border: '1px solid black', padding: '0.5rem' }}>{transport.vehicle}</td>
                  <td style={{ border: '1px solid black', padding: '0.5rem' }}>{transport.vehicleNumber}</td>
                  <td style={{ border: '1px solid black', padding: '0.5rem' }}>{transport.driver}</td>
                  <td style={{ border: '1px solid black', padding: '0.5rem' }}>
                    {new Date(transport.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    })}
                  </td>
                  <td style={{ border: '1px solid black', padding: '0.5rem' }}>{transport.time}</td>
                  <td style={{ border: '1px solid black', padding: '0.5rem' }}>{transport.cost}</td>
                  <td style={{ border: '1px solid black', padding: '0.5rem' }}>{transport.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TransportFinancial;
