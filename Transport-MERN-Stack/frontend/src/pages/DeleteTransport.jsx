import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './styleSheet.css';

const DeleteTransport = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeleteTransport = async () => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:5555/transports/${id}`);
      setLoading(false);
      navigate('/');
    } catch (error) {
      setLoading(false);
      alert('An error happened. Please check the console.');
      console.log(error);
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <BackButton />
      <h1 style={{ fontSize: '1.5rem', marginTop: '1rem' }}>Delete Transport</h1><br></br>
      {loading ? <Spinner /> : ''}
      <div style={{backgroundColor:'white', display: 'flex', flexDirection: 'column', alignItems: 'center', border: '2px solid #87CEEB', borderRadius: '0.5rem', width: '600px', padding: '2rem', margin: 'auto' }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Are You Sure Want To Delete This Transport?</h3>
        <button style={{ padding: '1rem', backgroundColor: '#FF0000', color: 'white', margin: '1rem 0', width: '100%' }} onClick={handleDeleteTransport}>
          Yes, Delete It.
        </button>
      </div>
    </div>
  );
};

export default DeleteTransport;
