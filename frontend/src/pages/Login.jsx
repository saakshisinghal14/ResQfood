// Login.js
import React, { useState } from 'react';
import axios from 'axios';
import bg from '../assets/loginbg.jpg';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/login', { email, password })
      .then(result => {
        console.log(result);

        if (result.data === "Success") {
          navigate('/dashboard');
        }
      });
  };

  return (
    <div style={styles.container}>
        <div style={styles.cards}>
  

 
      <div className="navbar-logo">
        {/* Your logo component or image goes here */}
     <img src={logo} alt="jhjkfhj" style={styles.logo}/>
      </div>
<div style={{display: 'flex' , justifyContent:'center' , flexDirection:'column', gap:'250px'}}>


      <div style={{display: 'flex' , justifyContent:'center',color:'white', flexDirection:'column', alignItems:'center',}}>
        <h2 >Welcome to ResQfood </h2>
        <h4 style={{color:'#f6f5f5c7', margin:'20px'}}>Sustainably Share Surplus</h4>
      </div>

      <div style={{display: 'flex'  , justifyContent:'space-evenly',color:'#f6f5f5e2'}}>
        <div style={{display: 'flex'  , justifyContent:'center',gap:'6px'}}>
        <p>&copy; </p>
      <p>2024.ResQfood.in</p>
     
        </div>
 <div style={{display: 'flex' , justifyContent:'center',gap:'6px'}}>
 <p>About</p>
      <p>Terms</p>
      <p>Privacy</p>
 </div>
      </div>
      </div>
      </div>
      <div>

       <h2 style={styles.title}>  
       Login
        </h2>
      <div style={styles.card}>
       
        <form onSubmit={handleLogin}>
          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input} />
          </label>
          <br />
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={styles.input} />
          </label>
          <br />
          <button type='submit' style={styles.button}>
            Login
          </button>
        </form>
        
      </div>
      <div style={{ margin: '2px ', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <p style={{ marginTop: '3px' }}> Register your Restaurant</p>
          <Link to='/signup' className='btn btn-default border w-100  rounded-0 text-decoration-none' style={{ background: '#455860', color:'white'}}>
            Signup
          </Link>
        </div>
    </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100vh',
    backgroundImage: `url(${bg})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment:' fixed',
    backgroundPosition:'left center',
  },
  logo:{
    height:"100px",
    width: "100px",
    marginTop: "13px",
  },
  card: {
    width: '300px',
    height: '250px',
    padding: '20px',
    borderRadius: '10px',
    background: 'white',
    boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.2)',
  },
  cards: {
    width: '600px',
    height: '600px',
    padding: '20px',
    borderRadius: '10px',
    background: ' rgba(197, 10, 97, 0.799)',
    boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.2)',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#a20745',
    
  },
  input: {
    width: '100%',
    padding: '8px',
    boxSizing: 'border-box',
    marginBottom: '10px',
  },
  button: {
    width: '100%',
    padding: '10px',
    background: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Login;
