const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

// app.engine('ejs', require('express-ejs-extend')); // add this line
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// import routes
const tetrisRoutes = require('./api/tetris_api');
app.use(express.static(__dirname + '/public'));

//connect to mongoDb
mongoose.connect(process.env.DB_CONNECTION,
    { 
        useUnifiedTopology: true,
        useNewUrlParser: true 
    },
    ()=>{
console.log('connected to db');
});

app.use('/api', tetrisRoutes);

//routes
app.get('/',(req, res) =>{
    res.render('home');
});

app.get('/play',(req, res) =>{
    res.render('marathon');
});

app.post('/submit',(req, res) =>{
    console.log(req.body);
});

app.get('/api',(req, res) =>{
    res.send('We are on api');
});
 
//listen
app.listen(3000);
