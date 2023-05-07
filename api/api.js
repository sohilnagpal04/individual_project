const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const lights = require('./models/light');
const acs = require('./models/ac');
const securitys = require('./models/security');

mongoose.connect('mongodb+srv://sohil:sohil@cluster0.hvkfuyc.mongodb.net/mydb', { useNewUrlParser: true, useUnifiedTopology: true });
const app = express();
const port = 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    next();
});

app.use(express.static(`${__dirname}/public/generated-docs`));

app.get('/docs', (req, res) => {
  res.sendFile(`${__dirname}/public/generated-docs/index.html`);
});

/**
* @api {get} /light Get lights
* @apiGroup Light
* @apiSuccessExample {json} Success-Response:
*[
*    {
*        "light1": 1,
*        "brightness": 50,
*        "color": "#ffffff"
*    },
*    {
*        "light2": 2,
*        "brightness": 50,
*        "color": "#ffffff"
*    },
*    {
*        "light": 3,
*        "brightness": 50,
*        "color": "#ffffff"
*    }
]
* @apiErrorExample {json} Error-Response:
*  {
*    "User does not exist"
*  }
*/

app.get('/light', (req, res) => {
    lights.find({})
        .then(light => res.send(light))
        .catch(err => res.send(err));
});


/**
* @api {get} /ac get ac
* @apiGroup Ac
* @apiSuccessExample {json} Success-Response:
*[
*    {
*        "id":1,
*        "temperature": 10,
*        "fanSpeed": 2,
*        "mode": "cool"
*    }
*]
* @apiErrorExample {json} Error-Response:
*  {
*    "User does not exist"
*  }
*/

app.get('/ac', (req, res) => {
    acs.find({})
        .then(light => res.send(light))
        .catch(err => res.send(err));
});

/**
* @api {get} /security get security
* @apiGroup Security
* @apiSuccessExample {json} Success-Response:
*[
*    {
*        "id":1,
*        "door1":"locked",
*        "door2":"locked",
*        "Window1":"Closed"
*    }
*]
* @apiErrorExample {json} Error-Response:
*  {
*    "User does not exist"
*  }
*/


app.get('/security', (req, res) => {
    securitys.find({})
        .then(light => res.send(light))
        .catch(err => res.send(err));
});

/**
* @api {post} /light post light
* @apiGroup Light
* @apiSuccessExample {json} Success-Response:
*[
*    {
*        "light1": 1,
*        "brightness": 50,
*        "color": "#ffffff"
*    },
*    {
*        "light2": 2,
*        "brightness": 50,
*        "color": "#ffffff"
*    },
*    {
*        "light": 3,
*        "brightness": 50,
*        "color": "#ffffff"
*    }
]
* @apiErrorExample {json} Error-Response:
*  {
*    "User does not exist"
*  }
*/

app.post('/light', (req, res) => {
    const { light, brightness, color } = req.body;
    console.log(req.body);
    const check = { light: light };
    const update = { brightness: brightness, color: color };

    try {
        const result = lights.findOneAndUpdate(check, update).exec();
    } catch (error) {
        console.log(error);
    }
});

/**
* @api {post} /ac post ac
* @apiGroup Ac
* @apiSuccessExample {json} Success-Response:
*[
*    {
*        "id":1,
*        "temperature": 10,
*        "fanSpeed": 2,
*        "mode": "cool"
*    }
*]
* @apiErrorExample {json} Error-Response:
*  {
*    "User does not exist"
*  }
*/

app.post('/ac', (req, res) => {
    const { id,temperature, fanSpeed, mode } = req.body;
    console.log(req.body);
    const checkac = { id: id };
    const updateac = {temperature:temperature, fanSpeed: fanSpeed, mode: mode
    };

    try {
        const result = acs.findOneAndUpdate(checkac, updateac).exec();
    } catch (error) {
        console.log(error);
    }
});

/**
* @api {post} /security get security
* @apiGroup Security
* @apiSuccessExample {json} Success-Response:
*[
*    {
*        "id":1,
*        "door1":"locked",
*        "door2":"locked",
*        "Window1":"Closed"
*    }
*]
* @apiErrorExample {json} Error-Response:
*  {
*    "User does not exist"
*  }
*/

app.post('/security', (req, res) => {
    const {id, door1,door2,window1} = req.body;
    console.log(req.body);
    const check = { id: id };
    const update = {door1: door1, door2: door2, window1: window1};

    try {
        const result =securitys.findOneAndUpdate(check, update).exec();
    } catch (error) {
        console.log(error);
    }
});

app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`);
});