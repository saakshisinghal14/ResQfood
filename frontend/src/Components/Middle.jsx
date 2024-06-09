import React from 'react';
import Slide from "./Slide";
import { Link } from 'react-router-dom';

const Middle = () => {
  return (
    
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 'auto', marginTop: '20px' }}>

      <Slide />

      <div style={{ marginTop: '20px', textAlign: 'center', padding: '0 20px' ,display:'flex', justifyContent:'center', flexDirection:'column', alignItems:'center'}}>
      <div  style={{ padding: '10px 20px',  backgroundColor: '#651e3e', width:'300px' }}> 
          <Link to='/login' style={{ fontSize: '16px',  color: 'white',  cursor: 'pointer', textDecoration: 'none' }}>Add Restaurant</Link>
        </div>
        <h2 style={{ marginBottom: '20px', fontSize: '24px', color: '#651e3e' }}>Reduce food waste efficiently by connecting restaurants with NGOs</h2>
    
        
      </div>

   
    </div>
  );
};

export default Middle;
