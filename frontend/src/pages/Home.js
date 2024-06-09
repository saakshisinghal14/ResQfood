import React, { useState, useEffect } from "react";

import Nav from '../Components/Nav'
import  Middle from "../Components/Middle";
import SeaTurtlesWebDesign from '../Components/SeaTurtlesWebDesign';
import scrollToTopImage from "../assets/arr.png";
const Home = () => {

  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 200) {
      // Show the scroll-to-top button when scrolled down 200px
      setShowScrollButton(true);
    } else {
      setShowScrollButton(false);
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth" // Smooth scrolling animation
    });
  };
  const styles = {
    // Style for the scroll to top button (image)
    scrollToTopButton: {
      position: "fixed",
      bottom: "20px",
      right: "20px",
      width: "50px", // Set width and height of the image
      height: "50px",
      borderRadius: "50%", // Make the image round (optional)
      cursor: "pointer",
      zIndex: "1000" // Ensure the button is on top of other elements
    }
  };
  
  return (
    <div >
    <Nav/>
    
    <Middle/>
    <SeaTurtlesWebDesign/>

          {/* Scroll to top button */}
          {showScrollButton && (
        <img
          src={scrollToTopImage} // Use your scroll-to-top image here
          alt="Scroll to Top"
          onClick={handleScrollToTop}
          style={styles.scrollToTopButton}
        />
      )}

    </div>
  )
}

export default Home
