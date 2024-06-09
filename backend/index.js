const express = require('express');
const { spawn } = require('child_process');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const { differenceInDays } = require('date-fns');

const app = express();
const RestaurantModel = require('./models/Restaurant');
const DashboardModel = require('./models/Dashboard');
const ContactModel = require('./models/Contact');

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

mongoose.connect("mongodb://localhost:27017/Resqfood");

// Register a new restaurant
app.post('/register', (req, res) => {
    RestaurantModel.create(req.body)
        .then(restaurant => res.json(restaurant))
        .catch(err => res.status(500).json({ error: err.message }));
});

// Contact form submission
app.post('/contact', (req, res) => {
    const { name, email, subject, message } = req.body;
    const newContact = new ContactModel({ name, email, subject, message });
    newContact.save()
        .then(contact => res.json(contact))
        .catch(err => res.status(500).json({ error: err.message }));
});

// User login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    RestaurantModel.findOne({ email })
        .then(user => {
            if (!user) return res.status(404).json({ error: "User not found" });
            if (user.password !== password) return res.status(401).json({ error: "Incorrect password" });
            res.json({ status: "Success", restaurantName: user.restaurantName });
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

// Get all restaurants
app.get('/restaurants', async (req, res) => {
    try {
        const restaurants = await RestaurantModel.find();
        res.json(restaurants);
    } catch (error) {
        console.error('Error fetching restaurant data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get restaurant details by userId
app.get('/getRestaurantDetails/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const restaurant = await RestaurantModel.findById(userId);
        if (restaurant) {
            res.json(restaurant);
        } else {
            res.status(404).json({ error: "Restaurant not found" });
        }
    } catch (error) {
        console.error('Error fetching restaurant details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get userId by email
app.get('/getUserId', async (req, res) => {
    try {
        const { email } = req.query;
        const user = await RestaurantModel.findOne({ email });
        if (user) {
            res.json({ userId: user._id });
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get user posts by userId
app.get('/getUserPosts/:userId', (req, res) => {
    const userId = req.params.userId;
    DashboardModel.find({ userId })
        .then(posts => res.json(posts))
        .catch(err => res.status(500).json({ error: err.message }));
});

// Execute Python script for food quality assessment
const executePython = async (script, args) => {
    const py = spawn("python", [script, ...args]);
    let output = '';

    py.stdout.on('data', (data) => {
        output += data.toString();
    });

    py.stderr.on("data", (data) => {
        console.error(`[python] Error occurred: ${data}`);
    });

    return new Promise((resolve, reject) => {
        py.on("exit", (code) => {
            console.log(`Child process exited with code ${code}`);
            resolve(output.trim());
        });
    });
};

// Create a new post
app.post('/createPost', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const { userId, foodName, date, foodCategory, storage, weather } = req.body;
    const minTemp = req.body.minTemp ? (typeof req.body.minTemp === 'string' ? parseFloat(req.body.minTemp.replace(',', '.')) : parseFloat(req.body.minTemp)) : '';
    

    const maxTemp = req.body.maxTemp ? (typeof req.body.maxTemp === 'string' ? parseFloat(req.body.maxTemp.replace(',', '.')) : parseFloat(req.body.maxTemp)) : '';
    const picturePath = req.file.path;

    try {
        const daysDifference = differenceInDays(new Date(), new Date(date));
        const result = await executePython('food_quality.py', [foodName, storage, weather, daysDifference, minTemp, maxTemp]);

        if (result.trim().toLowerCase() === "fresh") {
            DashboardModel.create({ userId, foodName, date, foodCategory, storage, weather, picturePath })
                .then(post => res.status(200).json(post))
                .catch(err => res.status(500).json({ error: err.message }));
        } else {
            console.log("Your food is not fresh. Result:", result);
            res.status(400).json({ error: "Food not fresh" });
            }
            } catch (error) {
            console.error('Error creating post:', error);
            res.status(500).json({ error: 'Internal server error' });
            }
            });
            
            const PORT = process.env.PORT || 3001;
            app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
            });
