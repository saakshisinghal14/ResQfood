import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Ensure correct import paths for images
import child from '../assets/banner/child.jpg';
import hungry from '../assets/banner/hunrychild.jpg';

const Slide = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [child, hungry];

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % images.length;
      setCurrentIndex(nextIndex);
    }, 5000); // Change to your desired interval in milliseconds

    return () => clearInterval(interval);
  }, [currentIndex, images.length]);

  const [dotActive, setDocActive] = useState(0)
  const settings = {
    dots: true,
    infinite: true,
    autoplay:true,
  
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
    beforeChange:(prev,next)=>{
      setDocActive(next);
    },

    appendDots: dots => (
      <div
        style={{
          position: "absolute",
          top:"90%",
          left:"0",
          right:"0",
          margin:" 0 auto",
          transform: "translate(-50% -50%)",
          width:"210px",
     
        }}
      >
        <ul 
          style=
          {{ 
            width:"100%", 
            display:'flex' ,
            alignItems:"center", 
            justifyContent:"space-between",
            padding: 0,
            margin: 0,
          }}
        > {dots} </ul>
      </div>
    ),
    customPaging:( i) => (
      <div
        style={
          i=== dotActive ?
          {
            width: "30px",
            height:"30px",
            borderRadius:"50%",
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            color: "white",
            background:" #f3a847",
            padding:"8px 0",
            cursor: "pointer",
            
          }
          : {
            width: "30px",
            height:"30px",
            borderRadius:"50%",
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            color: "white",
            background:"#232F3E",
            padding:"8px 0",
            cursor: "pointer",
            border: "1px blue white",
          }
        }
      >
        {i + 1}
      </div>
    ),
  };

  const sliderStyles = {
    width: '76vw', // Adjust as needed
    margin: '0 auto',
    overflow: 'hidden', // Hide overflowing content
    borderRadius: '8px', // Add rounded corners if desired
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', // Add a subtle shadow
    padding: '0.1px',
  };

  const imageStyles = {
    width: '100%', // Adjust as needed
    maxHeight: '70vh',
    objectFit: 'cover', // Ensure the image covers the entire container
    borderRadius: '8px', // Add rounded corners if desired
  };

  return (
    <div style={sliderStyles}>
      <Slider {...settings}>
        {images.map((im, index) => (
          <div key={index}>
            <img src={im} alt={`Image ${index + 1}`} style={imageStyles} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Slide;
