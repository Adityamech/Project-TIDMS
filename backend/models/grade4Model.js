const mongoose = require('mongoose');

// Define the schema for the example model
const grade4Schema = new mongoose.Schema({
  
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


const Grade4 = mongoose.model('grade4', grade4Schema);

module.exports = {Grade4};
