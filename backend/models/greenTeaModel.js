const mongoose = require('mongoose');

// Define the schema for the example model
const greenTeaSchema = new mongoose.Schema({
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


const GreenTea = mongoose.model('greenTea', greenTeaSchema);

module.exports = {GreenTea};
