const mongoose = require('mongoose');

// Define the schema for the example model
const grade3Schema = new mongoose.Schema({
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


const Grade3 = mongoose.model('grade3', grade3Schema);

module.exports = {Grade3};
