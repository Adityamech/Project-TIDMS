const mongoose = require('mongoose');

// Define the schema for the example model
const grade7Schema = new mongoose.Schema({
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


const Grade7 = mongoose.model('grade7', grade7Schema);

module.exports = {Grade7};
