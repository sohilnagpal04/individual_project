const express = require('express');
const bodyParser = require('body-parser');
const mqtt = require('mqtt');
const mongoose = require('mongoose');
const sensor = require('./models/data');
const app = express();
const port = 7000;

mongoose.connect('mongodb+srv://sohil:sohil@cluster0.hvkfuyc.mongodb.net/mydb', {useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

const client = mqtt.connect("mqtt://broker.hivemq.com:1883");

client.on('connect', () => {
    console.log('mqtt connected');
    client.subscribe('/sohil/sensor');
});


app.get('/sensor',(req,res)=>{
    sensor.find({})
    .then((sensor) => {
        res.send(sensor);
    })
    .catch((error)=>{
        res.send(error);
        console.log(error);
    })
})

client.on('message', (topic,message) => {
    if(topic=="/sohil/sensor"){
        const data = message.toString();
        const sensorData = {
            value:data
        }
        const NewSensor = new sensor(sensorData);
        console.log(NewSensor);
        NewSensor.save();
    }
})

app.listen(port);