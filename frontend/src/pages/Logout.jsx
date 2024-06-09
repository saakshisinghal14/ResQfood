import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Perform logout operation (clear authentication state, etc.)
        // Redirect the user to the login page after logout
        // You should implement your own logout logic here
        // For demonstration purposes, we'll simulate a logout by clearing local storage
        // localStorage.removeItem('loggedInUser'); // Clear authentication state
        navigate('/login', { replace: true }); // Redirect to the login page and replace the current entry in the history stack
    };

    return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;