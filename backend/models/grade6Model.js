const mongoose = require('mongoose');

// Define the schema for the example model
const grade6Schema = new mongoose.Schema({
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


const Grade6 = mongoose.model('grade6', grade6Schema);

module.exports = {Grade6};
