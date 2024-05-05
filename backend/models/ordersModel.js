const mongoose = require('mongoose');

// Define the schema for the example model
const ordersSchema = new mongoose.Schema({
  date: {
    type: String,
    // required: true
  },
  ordersId: {
    type: String,
    required: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  customerNumber: {
    type: Number,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    // required: true,

  },

  advance: {
    type: Number,
    // required: true,

  },
  balance: {
    type: Number,
    // required: true,

  },

  paymentStatus: {
    type: String,
    // required: true,
    // unique: true
  },

  deliveryStatus: {
    type: String,
    // required: true,
    // unique: true
  }
});

// Create the Example model based on the schema
const Orders = mongoose.model('orders', ordersSchema);

module.exports = {Orders};
