const express = require('express');
const app = express();
const cors = require("cors");
const router = require("./routes/index")
const mongoose = require('mongoose');


// Middleware setup
app.use(cors());
app.use(express.json());

//Database connection
// Database connection setup
const uri = 'mongodb://127.0.0.1:27017/TeaP'; // Replace 'localhost' with your MongoDB server address and 'yourDatabaseName' with the name of your database

// Connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    
    // You can define your schema and models here or perform other operations
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });

// Routes setup
app.use(router)

module.exports = app;