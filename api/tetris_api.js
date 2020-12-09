const express = require('express');
const Game = require('../models/Game');
const router = express.Router();

router.get('/tetris', async (req, res) =>{
    try{
        const allGames = await Game.find({});
        res.json(allGames);
    }catch(err){
        res.status(400).send(err);
    }
});

router.get('/tetris/:mode', async (req, res) =>{
    try{
        const games = await Game.find({mode: req.params.mode});
        res.json(games);
    }catch(err){
        res.status(400).send(err);
    }
});



module.exports = router;