// Welcome to EcoEats!
// EcoEats is a sustainable food delivery and meal planning platform designed to promote environmentally-friendly eating habits and support local food producers.
// Whether you're looking for healthy meal options, eco-friendly ingredients, or sustainable recipes,
// EcoEats provides a convenient and eco-conscious solution for your dietary needs.

// Sample code to demonstrate basic functionality of EcoEats

// Import necessary dependencies
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

// Define the Express application
const app = express();

// Middleware setup
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

// MongoDB setup
mongoose.connect('mongodb://localhost:27017/ecoeats', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define MongoDB schema and model for user data
const userSchema = new mongoose.Schema({
  username: String,
  age: Number,
  dietaryPreferences: [String],
});

const User = mongoose.model('User', userSchema);

// Define API endpoints

// Endpoint to create a new user
app.post('/api/users', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Endpoint to get user by ID
app.get('/api/users/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: 'User not found' });
  }
});

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
