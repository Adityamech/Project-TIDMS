const mongoose = require('mongoose');

// Define the schema for the example model
const grade5Schema = new mongoose.Schema({
  stockId: {
    type: String,
    unique: true
},
  stockDate: {
    type: String,
    // required: true
  },

  quantity: {
    type: Number,
    required: true,
    // unique: true
  },

});


const Grade5 = mongoose.model('grade5', grade5Schema);

module.exports = {Grade5};
