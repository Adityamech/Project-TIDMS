const mongoose = require('mongoose');

// Define the schema for the example model
const grade2Schema = new mongoose.Schema({

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


const Grade2 = mongoose.model('grade2', grade2Schema);

module.exports = {Grade2};
