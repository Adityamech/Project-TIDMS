const mongoose = require('mongoose');

// Define the schema for the example model
const stockSchema = new mongoose.Schema({
  stockDate: {
    type: String,
    // required: true
  },
  product: {
    type: String,
    required: true,
    unique : true,
  },
  price: {
    type: Number,
    // required: true,
    // unique: true
  },
  quantity: {
    type: Number,
    // required: true,
    // unique: true
  },

});

// Create the Example model based on the schema
const Stock = mongoose.model('stock', stockSchema);

module.exports = {Stock};
