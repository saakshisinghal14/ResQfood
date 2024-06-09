//signup.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import video1 from '../assets/shop.mp4';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Signup = () => {
  const [restaurantName, setRestaurantName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [foodCategory, setFoodCategory] = useState(''); // veg, non veg, both
  const [contactNumber, setContactNumber] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [website, setWebsite] = useState('');
  const [socialMedia, setSocialMedia] = useState('');
  const navigate=useNavigate()

  

  const handleSignUp = (e) => {
    // Implement your signup logic here
    e.preventDefault();
  
    axios.post('http://localhost:3001/register', {
      restaurantName,
      email,
      password,
      address,
      foodCategory,
      contactNumber,
      ownerName,
      website,
      socialMedia
    })
    .then((res) => {
      console.log(res);
    
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    })
    .catch((err) => {
      console.log(err);
      // Handle error here if needed
    });
  };
  


  return (
    
      <div className='main' >
        <div className="overlay"></div>
        <video src={video1} style={styles.video} autoPlay loop muted />
        <div style={styles.container}>
      <div style={styles.formBox}>
        <h2 style={styles.formHeading}>Sign Up</h2>
        <form onSubmit={handleSignUp} >
          <div style={styles.formField}>
            <label>
              Restaurant Name
              <input
                type="text"
                value={restaurantName}
                onChange={(e) => setRestaurantName(e.target.value)}
                style={styles.inputField}
              />
            </label>
          </div>

          <div style={styles.formField}>
            <label>
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.inputField}
              />
            </label>
          </div>

          <div style={styles.formField}>
            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.inputField}
              />
            </label>
          </div>

          <div style={styles.formField}>
            <label>
              Address        
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                style={{ ...styles.inputField, resize: 'vertical' }}
              />
            </label>
          </div>

          <div style={styles.formField}>
            <label>
              Food Category      
              <select
                value={foodCategory}
                onChange={(e) => setFoodCategory(e.target.value)}
                style={styles.inputField}
              >
                <option value="veg">Veg</option>
                <option value="nonveg">Non Veg</option>
                <option value="both">Both</option>
              </select>
            </label>
          </div>
          <div style={styles.formField}>
            <label>
              Contact Number               
              <input
                type="number"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                style={styles.inputField}
              />
            </label>
          </div>

          <div style={styles.formField}>
            <label>
              Restaurant Owner Name
              <input
                type="text"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                style={styles.inputField}
              />
            </label>
          </div>

          <div style={styles.formField}>
            <label>
              Website URL
              <input
                type="text"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                style={styles.inputField}
              />
            </label>
          </div>
          <div style={styles.formField}>
            <label>
              Social Media URL
              <input
                type="text"
                value={socialMedia}
                onChange={(e) => setSocialMedia(e.target.value)}
                style={styles.inputField}
              />
            </label>
          </div>


          <div style={styles.formField}>
            <button type="submit"  style={styles.submitButton}>
              Register
            </button>
          </div>
        </form>
        <p style={styles.loginText}>Already Have an Account?</p>
       
        
            <Link to='/login' className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>
              Login
            </Link>
          





      </div>
      </div>
    </div>
  );
};

const styles = {
  main: {
    position: 'relative',
    overflow: 'hidden',
    
  },
  video: {
    position: 'absolute',
    zIndex: '-1',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    
  },
  overlay: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)',
    zIndex: '0',
  },
  container: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formBox: {
    height: '94%',
    width: '100%',
    maxWidth: '500px',
    padding: '20px',
    borderRadius: '10px',
    background: 'rgba(255, 255, 255, 0.8)',
    
    boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.2)',
  },
  formHeading: {
    textAlign: 'center',
    marginBottom: '1px',
    height: '4%',
    textTransform: 'uppercase', 
    color: 'rgba(34, 139, 34, 0.8)',
    
    
  },
  formField: {
    marginBottom: '2px',


  },
  inputField: {
    width: '27vw',
    padding: '2px',
    boxSizing: 'border-box',
    borderRadius: '5px',
    border: '1px solid #ccc',
    background: 'rgba(255, 255, 255, 0.9)',
  },
  submitButton: {
    width: '100%',
    marginBottom:'2px',
    padding: '8px',
    background: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  loginText: {
    textAlign: 'center',
    color: '#555',
  },

  
  

 };
export default Signup;