const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config')

//routes
app.get('/',(req, res) =>{
    res.send('We are on home');
});

//connect to mongoDb
mongoose.connect(process.env.DB_CONNECTION,
                { useNewUrlParser: true },
                ()=>{
    console.log('connected to db');
});
 
//listen
app.listen(8000);
