const express = require('express');
const bodyParser = require("body-parser");
const { initializingPassport, protected } = require('./pconfig');
const mongoose = require('mongoose');
const ejs = require('ejs');
const helmet = require('helmet');
const expressSession = require("express-session");
const passport  = require('passport');
const User = require('./database');

const app = express();
const port = 8000;
mongoose.connect('mongodb+srv://sohil:sohil@cluster0.hvkfuyc.mongodb.net/mydb', {useNewUrlParser: true, useUnifiedTopology: true });

const web = `${__dirname}/web`;

app.use(express.static(web));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressSession({secret:"secret",resave:false,saveUninitialized:false}))
app.use(passport.initialize())
app.use(passport.session())

app.use(helmet.dnsPrefetchControl());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.originAgentCluster());
app.use(helmet.hsts());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());

initializingPassport(passport);


app.set("view engine","ejs");

app.get('/', (req, res) => {
    res.sendFile(`${web}/welcome.html`);
})

app.get('/lighting',protected,(req,res)=>{
    res.sendFile(`${web}/lightning.html`);
})
app.get('/ac',(req,res)=>{
    res.sendFile(`${web}/aircondition.html`);
})
app.get('/security',(req,res)=>{
    res.sendFile(`${web}/security.html`);
})

app.get('/add', (req,res) => {
    res.sendFile(`${web}/add-device.html`);
})

app.get('/devices', (req,res) => {
    res.sendFile(`${web}/show-devices.html`);
})

app.get('/delete', (req,res) => {
    res.sendFile(`${web}/delete-device.html`);
})
app.get('/show', (req,res) => {
    res.sendFile(`${web}/show-devices.html`);
})
app.get('/chart', (req,res) => {
    res.sendFile(`${web}/charts.html`);
})

app.get('/login',(req,res)=>{
    res.render('login');
})
app.get('/register',(req,res)=>{
    res.render('register');
})

app.get('/main',protected,(req,res)=>{
    res.sendFile(`${web}/main.html`);
})

app.post('/register', async(req, res) => {
    const user = await User.findOne({username:req.body.username});
  
    if(user) return res.status(400).send("user already exist! ");
  
    const newUser = await User.create(req.body);
    res.redirect('/login');
  })
  
  app.post('/login', passport.authenticate('local', {
    failureFlash: true,failureRedirect: "/register"
  }), function(req, res) {
    res.redirect('/main');
  });

app.listen(port,()=>{
    console.log(`app listening at http://localhost:${port}`);
});