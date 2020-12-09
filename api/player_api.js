const express = require('express');
const router = express.Router();
const Player = require('../models/Player');

router.get('/players', async (req, res) =>{
   try{
        const allPlayers = await Player.find();
        res.json(allPlayers);
   }catch(err){
       res.json({message: err});
   }
});

router.get('/players/:username', async (req, res) =>{
    try{
        const player = await Player.find({username: req.params.username});
        res.json(player);
    }catch(err){
        res.send('Username does not exist');
    }
});

router.post('/players', async (req, res) =>{
    const player = new Player({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        sex: req.body.sex
    });
    try{
        const newPlayer = await player.save();
        console.log("player saved to db");
    }catch(err){
        res.json({message: err});
    }

});



module.exports = router;