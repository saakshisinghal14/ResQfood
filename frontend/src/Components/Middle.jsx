import React from 'react';
import Slide from "./Slide";
import { Link } from 'react-router-dom';

const Middle = () => {
  return (
    
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 'auto', marginTop: '20px' }}>

      <Slide />

      <div style={{ marginTop: '20px', textAlign: 'center', padding: '0 20px' ,display:'flex', justifyContent:'center', flexDirection:'column', alignItems:'center'}}>
        <h2 style={{ marginBottom: '20px', fontSize: '24px', color: '#651e3e' }}>Reduce food waste efficiently by connecting restaurants with NGOs</h2>
        <div  style={{ padding: '10px 20px',  backgroundColor: '#651e3e', width:'300px' }}> 
          <Link to='/addngo' style={{ fontSize: '16px',  color: 'white',  cursor: 'pointer', textDecoration: 'none' }}>Add NGO</Link>
        </div>
        
      </div>

      <hr style={{ width: '80%', border: '1px solid #651e3e', marginTop: '20px' }} />

      <h1 style={{ fontSize: '28px', color: '#651e3e', marginBottom: '20px' }}>NGO</h1>

      <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%', margin: '0 auto', flexDirection: 'row' }}>
        <div className="card" style={{ width: '18rem' }}>
          <img src="..." className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" className="btn btn-primary">Go somewhere</a>
          </div>
        </div>
        <div className="card" style={{ width: '18rem' }}>
          <img src="..." className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" className="btn btn-primary">Go somewhere</a>
          </div>
        </div>
        <div className="card" style={{ width: '18rem' }}>
          <img src="..." className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" className="btn btn-primary">Go somewhere</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Middle;
