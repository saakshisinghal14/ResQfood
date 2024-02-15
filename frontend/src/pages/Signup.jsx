import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
    ownerName
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
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(to right, #232526, #414345)',
  },
  formBox: {
    width: '100%',
    maxWidth: '400px',
    padding: '20px',
    borderRadius: '10px',
    background: 'rgba(255, 255, 255, 0.9)',
    boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.2)',
  },
  formHeading: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  },
  formField: {
    marginBottom: '15px',
  },
  inputField: {
    width: '100%',
    padding: '5px',
    boxSizing: 'border-box',
    borderRadius: '5px',
    border: '1px solid #ccc',
    backgroundColor: '#f8f8f8',
  },
  submitButton: {
    width: '100%',
    padding: '10px',
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
