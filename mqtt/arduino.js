const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const sensor = require("./models/data");
const mongoose = require("mongoose");
const port = new SerialPort('/dev/cu.usbmodem11401', { baudRate: 9600 });
const parser = port.pipe(new Readline({ delimiter: '\n' }));
mongoose.connect('mongodb+srv://sohil:sohil@cluster0.hvkfuyc.mongodb.net/mydb', {useNewUrlParser: true, useUnifiedTopology: true });


port.on("open", () => {
  console.log('serial port open');
});

parser.on('data', data =>{
  console.log('Recieved Message: ', data);
    const sensorData = {
        state:data
    }
    const NewSensor = new sensor(sensorData);
    console.log(NewSensor);
    NewSensor.save();
});