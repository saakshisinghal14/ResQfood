
import React, { useState, useEffect } from 'react';
import './RestaurantDashboard.css';
import axios from 'axios';
import Logout from './Logout';
import { useLocation } from 'react-router-dom';
import gif from '../assets/foodscan.gif';
import video1 from '../assets/v.mp4';

const RestaurantDashboard = () => {
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalMessage1, setModalMessage1] = useState('');
    const [formData, setFormData] = useState({
        foodName: '',
        date: '',
        foodCategory: '',
        storage: '',
        weather: '',
        maxTemp: '',
        minTemp: '',
        image: null
    });
    const [buttonClicked, setButtonClicked] = useState(false);
    const [foodQuality, setFoodQuality] = useState('');
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState('');
    const [posts, setPosts] = useState([]);
    const [restaurantDetails, setRestaurantDetails] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const { loggedInUserEmail } = useLocation().state;

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const response = await axios.get('http://localhost:3001/getUserId', { params: { email: loggedInUserEmail } });
                setUserId(response.data.userId);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUserId();
    }, [loggedInUserEmail]);

    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/getUserPosts/${userId}`);
                setPosts(response.data.reverse());
            } catch (error) {
                console.error(error);
            }
        };
        if (userId) {
            fetchUserPosts();
        }
    }, [userId]);

    useEffect(() => {
        const fetchRestaurantDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/getRestaurantDetails/${userId}`);
                if (response.data) {
                    setRestaurantDetails(response.data);
                }
            } catch (error) {
                console.error(error);
            }
        };
        if (userId) {
            fetchRestaurantDetails();
        }
    }, [userId]);

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = e => {
        const file = e.target.files[0];
        setFormData({ ...formData, image: file });

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const postData = new FormData();
        for (let key in formData) {
            postData.append(key, formData[key]);
        }
    
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];
        const formattedTime = currentDate.toTimeString().split(' ')[0];
        const dateTimeString = `${formattedDate} ${formattedTime}`;
        postData.append('postdate', dateTimeString);
    
        setLoading(true);
    
        try {
            let maxTemp = 0;
            let minTemp = 0;
            if (formData.storage === 'yes') {
                maxTemp = formData.maxTemp;
                minTemp = formData.minTemp;
            } else {
                if (formData.weather === 'summer') {
                    maxTemp = 35;
                    minTemp = 35;
                } else if (formData.weather === 'winter') {
                    maxTemp = 10;
                    minTemp = 10;
                }
            }
    
            postData.append('maxTemp', maxTemp);
            postData.append('minTemp', minTemp);
    
            postData.append('userId', userId);
            const response = await axios.post('http://localhost:3001/createPost', postData);
    
            if (response.status === 200) {
                setFoodQuality('Fresh');
                const ngos = [
                    {
                        name: "No Hungry Child",
                        description: "No Hungry Child program is focused towards distributing Nutritious food to poor needy children along with Education support. We have a daily nutritious meal coverage of more than 20,000 hungry & underprivileged children and our daily food distribution regimen is smooth, efficient and dependable - 365 days a year.",
                        location: "Karnataka, India",
                        email: "support@nohungrychild.in"
                    },
                    {
                        name: "Annamrita Foundation",
                        description: "Annamrita Foundation started a mission-driven program to feed the school going children of India by becoming a partner in the Govt. of India’s Mid-Day Meal initiative. Over the past 18 years with the help of your support and selfless acts of charity by our donors, we’ve helped millions of school going children stay healthy and focus on their education.",
                        location: "Chembur, Mumbai",
                        email: "info@annamrita.org"
                    },
                    {
                        name: "No Food Waste",
                        description: "No Food Waste is an organisation which aims to redistribute excess food from weddings, parties, events to those who are hungry. We took an oath on that day to stop food waste and satisfy the hunger of many, in a quest to make the “World Hunger Free.",
                        location: "Coimbatore, Tamilnadu",
                        email: "info@nofoodwaste.org"
                    },
                    {
                        name: "Akshaya Patra Foundation",
                        description: "The Foundation strives to eliminate classroom hunger by implementing the PM POSHAN(Mid-Day Meal ) Programme. It provides nutritious meals to children studying in government schools and government-aided schools.",
                        location: "Gurgaon, Haryana",
                        email: "donorcare@akshayapatra.org"
                    }]
            
                
                const randomNGO = ngos[Math.floor(Math.random() * ngos.length)];
                setModalMessage(`Your food is fresh and will be delivered within 2 hours.`);
                setModalMessage1(`NGO Details:\nName: ${randomNGO.name}\nDescription: ${randomNGO.description}\nLocation: ${randomNGO.location}\nEmail: ${randomNGO.email}`);


              
                setTimeout(() => {
                    setShowModal(true);
                }, 2000);
            }
    
            setPosts([response.data, ...posts]);
            setFormData({
                ...formData,
                foodName: '',
                date: '',
                foodCategory: '',
                storage: '',
                weather: '',
                maxTemp: '',
                minTemp:'',
            });
        } catch (error) {
            setFoodQuality('Spoiled');
            let decomposeInstructions = '';
            switch (formData.foodCategory) {
                case 'junkfood':
                    decomposeInstructions = "Remove Packaging: Take off any plastic or non-biodegradable packaging and throw it in the trash or recycling. Compost (if possible): If the food is organic, chop it up and mix it with other compostable materials like leaves or paper. Avoid Fats: Don't compost foods with lots of fats or oils; throw them in the trash instead. Bury (if needed): If you can't compost, bury small amounts of food in your yard and cover it with soil. Watch for Pests: Keep an eye out for pests like rodents or insects and adjust your method if needed.";
                    break;
                case 'bakerystream':
                    decomposeInstructions = "Composting:Cut bakery and steam foods into small pieces and mix with other scraps in a compost pile. Burying:Dig a hole, bury the food scraps, and cover with soil. Bin Fermentation: Layer food scraps with a fermentation starter in a sealed bin.Worm Composting:Add food scraps to a worm bin with bedding materials.Avoid Landfill:Never throw food scraps in the trash; use one of the above methods instead.";
                    break;
                case 'dairy':
                    decomposeInstructions = "Burying Method: Choose a Spot: Find a spot in your yard away from water sources, like a corner of the garden. Dig a Hole: Dig a small hole in the ground, about a foot deep. Place Dairy Products: Put your dairy products, like milk, cheese, or yogurt, into the hole. Cover with Soil: Cover the dairy products completely with soil from the hole. Keep an Eye: Occasionally check the spot to ensure there's no smell or disturbance.";
                    break;
                case 'other':
                    decomposeInstructions = "Certainly! Here are shorter explanations for safely decomposing each category: Fruits and Vegetables (High-Moisture Foods): Compost chopped pieces with dry materials like leaves. Meat and Dairy Products (Animal Protein and Dairy): Bury deep in soil or dispose in sealed bags in the trash. Grains and Breads (Carbohydrates): Compost or bury broken pieces to speed up decomposition. Cooking Oils and Fats (Liquid Fats): Allow to solidify before disposing in the trash. Packaged and Processed Foods (Non-Perishable and Perishable): Dispose non-perishables in trash/recycling; discard perishables in sealed bags.";
                    break;
                default:
                    decomposeInstructions = "Instructions not available for this category.";
            }
    
            setModalMessage("Your food is spoiled.");
            setModalMessage1(`${decomposeInstructions}`);
            setTimeout(() => {
                setShowModal(true);
            }, 2000);
    
            setFormData({
                ...formData,
                foodName: '',
                date: '',
                foodCategory: '',
                storage: '',
                weather: '',
                maxTemp: '',
                minTemp: ''
            });
            setImagePreview(null);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        }
    };
    

const playVideo = () => {
    setModalMessage('');
    setModalMessage1('');
    setButtonClicked(true);

    if (modalMessage !== 'Your food is spoiled.') {
        const videoElement = document.getElementById('modalVideo');
        videoElement.play();
        setTimeout(() => {
            setShowModal(false);
            videoElement.pause();
            videoElement.currentTime = 0;
            setButtonClicked(false);
        }, 3000);
    } else {
        setTimeout(() => {
            setShowModal(false);
            setButtonClicked(false);
        }, 2000);
    }
};

const currentDate = new Date().toISOString().split('T')[0];

return (
    <div className="restaurant-dashboard">
        <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
            <div className="dashboard-content">
                <form onSubmit={handleSubmit} className="card post-form">
                    <input type="text" name="foodName" placeholder="Food Name" onChange={handleChange} value={formData.foodName} className="form-input" />
                    <label className="form-label"> Date of Making</label>
                    <input
                        type="date"
                        name="date"
                        onChange={handleChange}
                        value={formData.date}
                        max={currentDate}
                        className="form-input"
                    />
                    <select name="foodCategory" onChange={handleChange} value={formData.foodCategory} className="form-input">
                        <option value="">Select Food Category</option>
                        <option value="junkfood">Junk food</option>
                        <option value="bakerystream">Bakery and Steam</option>
                        <option value="dairy">Dairy product</option>
                        <option value="other">Other</option>
                    </select>
                    <input type="text" name="storage"
 placeholder="Storage" onChange={handleChange} value={formData.storage} className="form-input" />
 <input type="text" name="weather" placeholder="Weather" onChange={handleChange} value={formData.weather} className="form-input" />
 {formData.storage === 'yes' && (
     <div>
         <input type="number" name="maxTemp" placeholder="Max Temperature" onChange={handleChange} value={formData.maxTemp} className="form-input" />
         <input type="number" name="minTemp" placeholder="Min Temperature" onChange={handleChange} value={formData.minTemp} className="form-input" />
     </div>
 )}
 <input type="file" name="image" onChange={handleImageChange} className="form-input" />
 {imagePreview && (
     <div className="image-container">
         <img src={imagePreview} alt="Preview" className="image-preview" />
     </div>
 )}
 <button type="submit" className="form-input">Submit</button>
</form>
{loading && <div className="loading-container">
 <img src={gif} alt="Loading..." className="loading-image" />
</div>}
</div>

<div className="restaurant-details-card">
<Logout styles={{
 backgroundColor: '#f44336',
 color: 'white',
 padding: '10px 10px',
 border: 'none',
 borderRadius: '5px',
 fontSize: '16px',
 cursor: 'pointer',
 transition: 'background-color 0.3s ease',
 marginRight: '20px',
}} />
{restaurantDetails && (
 <div className="content">
     <h1>{restaurantDetails.restaurantName}</h1>
     <p><strong>Email:</strong> {restaurantDetails.email}</p>
     <p><strong>Address:</strong> {restaurantDetails.address}</p>
     <p><strong>Contact Number:</strong> {restaurantDetails.contactNumber}</p>
     <p><strong>Food Category:</strong> {restaurantDetails.foodCategory}</p>
     <p><strong>Owner Name:</strong> {restaurantDetails.ownerName}</p>
     <p><strong>Website:</strong> <a href={restaurantDetails.website} target="_blank" rel="noopener noreferrer" style={{ color: '#ffff' }}>{restaurantDetails.website}</a></p>
 </div>
)}
</div>
</div>

<div className="user-posts">
<h1>User Posts</h1>
<div className="posts-container">
{posts.map(post => (
 <div className="post" key={post._id}>
     <img src={`http://localhost:3001/${post.picturePath}`} alt="Post" />
     <div className="post-details">
         <p className="post-date">{new Date(post.postdate).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}</p>
         <p><strong>Food Name:</strong> {post.foodName}</p>
         <p><strong>Date:</strong> {new Date(post.date).toDateString()}</p>
         <p><strong>Food Category:</strong> {post.foodCategory}</p>
         <p><strong>Storage:</strong> {post.storage}</p>
         <p><strong>Weather:</strong> {post.weather}</p>
     </div>
 </div>
))}
</div>
</div>

{showModal && (
<div className="modal" onClick={playVideo}>
<div className="modal-content">
 <span className="close" onClick={() => setShowModal(false)}>&times;</span>
 <p>{modalMessage}</p>
 <p>{modalMessage1}</p>
 <video id="modalVideo" src={video1} className="modal-video"></video>
 {!buttonClicked && <button onClick={playVideo}>OK</button>}
</div>
</div>
)}
</div>
);
};

export default RestaurantDashboard;

