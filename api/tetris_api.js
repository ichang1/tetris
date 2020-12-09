const express = require('express');
const Game = require('../models/Game');
const router = express.Router();

router.get('/tetris', async (req, res) =>{
    try{
        const allGames = await Game.find();
        res.send(allGames.json());
    }catch(err){
        res.status(400).send(err);
    }
});

router.get('/tetris/:mode', async (req, res) =>{
    try{
        const games = await Game.find({mode: req.params.mode});
        res.send(games.json());
    }catch(err){
        res.status(400).send(err);
    }
});



module.exports = router;