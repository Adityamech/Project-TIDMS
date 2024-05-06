const mongoose = require('mongoose');

// Define the schema for the example model
const grade1Schema = new mongoose.Schema({

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


const Grade1 = mongoose.model('grade1', grade1Schema);

module.exports = {Grade1};
