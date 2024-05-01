// app.js

const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
const router = require("./routes/index");

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());

// Database connection setup
const uri = 'mongodb://127.0.0.1:27017/TeaP'; // Replace 'localhost' with your MongoDB server address and 'yourDatabaseName' with the name of your database

// Connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Error connecting to MongoDB:', error));

// User schema and model
const UserSchema = new mongoose.Schema({
    mobile: { type: Number, required: true },
    password: { type: String, required: true }
});
const UserModel = mongoose.model('User', UserSchema);

// Login route
app.post('/login', async (req, res) => {
  const { mobile, password } = req.body;

  try {
    // Find the user in the database
    const user = await UserModel.findOne({ mobile });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // If user is found and password matches, redirect to dashboard
    res.json({ message: 'Login successful', user, redirectUrl: '/dashboard' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'An error occurred during login' });
  }
});

// Routes setup
app.use(router);

module.exports = app;