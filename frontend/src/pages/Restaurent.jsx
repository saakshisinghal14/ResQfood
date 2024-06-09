import React from 'react';
import Nav from '../Components/Nav';
import { Link } from 'react-router-dom';
import video1 from '../assets/delivery.mp4';

const Restaurant = () => {

  const containerStyle = {
    position: 'relative', // Added position relative
    color: 'white',
    minHeight: '100vh', // Adjusted to minimum height
    // display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const videoStyle = {
    position: 'absolute',
  
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: '-1',
 
  };

  const contentStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.571)',
    width: '100%',
    height:'75%',
    padding: '168px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const headingStyle = {
    fontSize: '2rem',
    marginBottom: '20px', // Increased margin
    textAlign: 'center', // Centered text
    maxWidth: '80%', // Adjusted max width for responsiveness
    // color:'#f6f5f5e2'
    
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    display: 'inline-block',
    margin: '20px', // Adjusted margin
    padding: '10px 20px', // Increased padding
    background: '#4CAF50',
    borderRadius: '5px',
    textAlign: 'center',
    minWidth: '200px', // Adjusted min width for responsiveness
  };

  const boxStyle = {
    display: 'flex',
    justifyContent: 'center',
    margin: '20px', // Adjusted margin
    flexWrap: 'wrap', // Wrapped buttons on smaller screens
  };

  return (
    <div style={containerStyle}>
      <video autoPlay muted loop style={videoStyle}>
        <source src={video1} type="video/mp4" />
      </video>
      <Nav />
      <div style={contentStyle}>
        <h2 style={headingStyle}>
          Maximize your kitchen's potential! Partner with us to sell surplus food, create additional revenue streams, and foster a stronger connection with your local community.
        </h2>
        <div style={boxStyle}>
          <Link to='/signup' style={linkStyle}>Register your restaurant</Link>
          <Link to='/login' style={linkStyle}>Login to view your existing restaurants</Link>
        </div>
        <p>Need help?</p>
        <p>Please email us at resQfood@gmail.com</p>
        <p>Contact +91-1234567890</p>
      </div>
    </div>
  );
};

export default Restaurant;