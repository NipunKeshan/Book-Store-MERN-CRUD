import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logoImage from '../images/logo.png'; 
import './NavigationBar.css';
const NavigationBar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light rounded border border-secondary" >
        <Link to="/" className="navbar-brand"><img style={{ width: '150px', height: '50px' }} src={logoImage} alt="Your Logo" /></Link>
        <button className="navbar" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          
        </button>
        <div  >
          <h1 >Transport Management - Seylin Garments</h1>
        </div>
      </nav>
    </div>
  );
};

export default NavigationBar;