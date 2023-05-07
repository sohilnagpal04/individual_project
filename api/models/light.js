const mongoose = require('mongoose');

const controlSchema = new mongoose.Schema({
  light: {
    type: Number,
    required: true
  },
  brightness: {
    type: Number,
    required: true
  },
  color: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Control', controlSchema,'light');
