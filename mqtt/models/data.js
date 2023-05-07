const mongoose = require('mongoose');

const sensor = new mongoose.Schema({
    value:Number,
    time:{type:Date,default:Date.now},
});

const data = mongoose.model("sensor",sensor,"Sensor");
module.exports = data;   