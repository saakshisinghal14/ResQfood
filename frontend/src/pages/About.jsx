import React, { useState, useEffect } from 'react';
import Nav from '../Components/Nav';
import bg from '../assets/cardbg.jpg';
import P1 from '../assets/problem/problem1.png'
import P2 from '../assets/problem/problem2.jpg'
import P3 from '../assets/problem/problem3.jpeg'
import P4 from '../assets/problem/problem4.png'
import P5 from '../assets/problem/problem 5.png'
import P6 from '../assets/problem/problem 6.png'
import res from '../assets/restaurant.jpg'
import axios from 'axios';




import Problem from '../Components/Problem';
const About = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    // Fetch restaurant data from MongoDB
    axios.get('http://localhost:3001/restaurants')
      .then(response => {
        setRestaurants(response.data);
      })
      .catch(error => {
        console.error('Error fetching restaurant data:', error);
      });
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/contact', formData); // Updated API URL
      alert('Message sent successfully!');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error sending message:', error);
      alert('An error occurred while sending the message. Please try again later.');
    }
  };
  return (
    <div>
      <Nav />
      <div style={{ backgroundColor: '#f0f0f0', minHeight: '100vh', }}>
      <div style={{ padding:'2px', display: 'flex', justifyContent: 'space-evenly', }}>
        {/* Background Image */}
       
        <div style={{ flex: 1, height: '25rem', backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '15px', boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)' }} />
        {/* Content */}
        <div style={{ flex: 1, padding: '2rem', color: 'black' }}>
          <h1 style={{ fontWeight: 'bold', marginBottom: '1rem' }}>About us</h1>
          <h5 style={{ lineHeight: '1.6', fontWeight: 'bold' }}>
            Sustainable Food Waste Reduction App is a web application designed to connect restaurants with non-governmental organizations (NGOs) for the purpose of efficiently delivering surplus food. The app utilizes ML to analyze images of food, assessing spoilage risk and optimizing inventory management. The AI-driven system ensures that only approved and safe-to-consume surplus foods are directed to NGOs, enhancing food safety standards.
            Moreover, the app employs computer vision to accurately identify different waste types, guiding users on proper sorting for recycling and composting.
          </h5>
        </div>
      </div>
      <div style={{'display':'flex' , 'justifyContent':'center', 'flexDirection':'column', 'alignItems':'center','margin':'2rem'}}>
        <h1 style={{'color':'#634354'}}>
          The Problem 
        </h1>
        
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Problem image={P1} description="Limited Access to Surplus Food" />
            <Problem image={P2} description="Uncertainty about Food Safety" />
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', width: '100%' }}>
              <Problem image={P3} description="Inefficient Food Pickup and Delivery" />
              <Problem image={P4} description="One-Third of Food Wasted Everyday" />
              <Problem image={P5} description="Every 10sec Child dies from hunger" />
            </div>
            <Problem image={P6} description="Every eight  people sleeps hungry each night" />
          </div>
        
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
  <h1 style={{color:'#7c2e42'}}>What We Do</h1>
  <div style={{ display: 'flex', justifyContent: 'center', gap: '10rem' }}>
    <div className="card" style={{ width: '20rem', padding: '30px', margin: '10px', backgroundColor: 'transparent', border: '2px solid #638b82', boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)' }}>
      <div className="card-body">
        <h5 className="card-title">Connecting Restaurants with NGOs</h5>
        <p className="card-text">The app serves as a platform to facilitate the connection between restaurants and non-governmental organizations (NGOs). It streamlines the process of donating surplus food from restaurants to NGOs, ensuring that excess food is efficiently distributed to those in need rather than being wasted.</p>
      </div>
    </div>
    <div className="card" style={{ width: '20rem', padding: '30px', margin: '10px', backgroundColor: 'transparent', border: '2px solid red', boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)' }}>
      <div className="card-body">
        <h5 className="card-title">Utilizing Machine Learning (ML) and Artificial Intelligence (AI)</h5>
        <p className="card-text">The app incorporates ML and AI technologies to enhance its functionality. Specifically, ML is used to analyze images of food, allowing the app to assess the risk of spoilage and optimize inventory management. Through AI-driven systems, only safe-to-consume surplus foods are directed to NGOs, thereby improving food safety standards and minimizing health risks.</p>
      </div>
    </div>
    <div className="card" style={{ width: '20rem', padding: '30px', margin: '10px', backgroundColor: 'transparent', border: '2px solid #ffc107', boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)' }}>
      <div className="card-body">
        <h5 className="card-title">Promoting Efficiency in Food Distribution</h5>
        <p className="card-text">The app enhances the efficiency of food distribution by streamlining the process of surplus food transfer from restaurants to NGOs. By providing a centralized platform for communication and coordination between stakeholders, it reduces logistical challenges and ensures timely delivery of food to those in need.</p>
      </div>
    </div>
  </div>
</div>


      <div style={{ position: 'relative', backgroundImage: `url(${res})`, backgroundSize: 'cover', backgroundPosition: 'center', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
  <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(255, 255, 255, 0.6)' }}></div>
  <div style={{ zIndex: 1, textAlign: 'center', color: '#333' }}>
    <h1 style={{ marginBottom: '2rem' }}>Our Connected Restaurants</h1>
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
      {restaurants.map((restaurant, index) => (
        <div key={index} style={{ flexBasis: '30%', padding: '1rem', borderRadius: '5px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', transition: 'transform 0.3s, box-shadow 0.3s', backgroundColor: '#fff' }}>
          <h2 style={{ marginBottom: '1rem' }}>{restaurant.restaurantName}</h2>
          <p><strong>Address:</strong> {restaurant.address}</p>
          <p><strong>Email:</strong> {restaurant.email}</p>
          <p><strong>Contact:</strong> {restaurant.contactNumber}</p>
          <p><strong>Food Category:</strong> {restaurant.foodCategory}</p>
          <p>
            <strong>Website:</strong> <a href={restaurant.website} target="_blank" rel="noopener noreferrer" style={{ color: '#651e3e' }}>{restaurant.website}</a>
          </p>
        </div>
      ))}
    </div>
  </div>
</div>

<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', minHeight: '80vh' ,margin:'2rem'}}>
  <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
    <h3 style={{backgroundColor:'teal',color:'white',padding:"1rem"}}>Write a message</h3>
    <h1>Have Any Questions?</h1>
  </div>
  <form onSubmit={handleSubmit} style={{ width: '50%', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', padding: '2rem', borderRadius: '10px', backgroundColor: '#fff' }}>
    <div className="mb-3">
      <label className="form-label">Name</label>
      <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} />
    </div>
    <div className="mb-3">
      <label className="form-label">Email address</label>
      <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} />
    </div>
    <div className="mb-3">
      <label className="form-label">Subject</label>
      <input type="text" className="form-control" name="subject" value={formData.subject} onChange={handleChange} />
    </div>
    <div className="mb-3">
      <label className="form-label">Message</label>
      <textarea className="form-control" name="message" value={formData.message} onChange={handleChange}></textarea>
    </div>
    <button type="submit" className="btn btn-primary" style={{backgroundColor:'maroon'}}>Submit</button>
  </form>
</div>


      </div>
    </div>
  );
};

export default About;

