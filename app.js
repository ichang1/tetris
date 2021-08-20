const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const Game = require("./models/Game");
const PORT = process.env.PORT || 5000;
const http = require("http");
const server = http.Server(app);
require("dotenv/config");

app.use(express.static("client"));

// app.engine('ejs', require('express-ejs-extend')); // add this line
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// import routes
const tetrisRoutes = require("./api/tetris_api");
app.use(express.static(__dirname + "/public"));

//connect to mongoDb
mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  () => {
    console.log("connected to db");
  }
);

app.use("/api", tetrisRoutes);

//routes
app.get("/", (req, res) => {
  res.render("home", { url: process.env.BASE_URL || `localhost:${PORT}` });
});

app.post("/play", (req, res) => {
  const name = req.body.username;
  res.render("marathon", {
    name: name,
    url: `${process.env.BASE_URL || `localhost:${PORT}`}/play`,
  });
});

app.post("/submit", async (req, res) => {
  const gameData = new Game({
    playedBy: req.body.name,
    mode: "marathon",
    score: req.body.score,
    level: req.body.level,
    lines: req.body.lines,
  });
  try {
    const newSubmission = await gameData.save();
  } catch (err) {
    res.status(400).send(err);
  }
  res.redirect("/");
});

app.get("/marathon_leaderboards", async (req, res) => {
  try {
    const games = await Game.aggregate([
      { $match: { mode: "marathon" } },
      {
        $group: {
          _id: "$playedBy",
          level: { $first: "$level" },
          score: { $first: "$score" },
          lines: { $first: "$lines" },
        },
      },
      { $sort: { level: -1, score: -1, lines: -1, _id: -1 } },
    ]);
    const table = [];
    for (r of games) {
      const game = {
        level: r.level,
        score: r.score,
        lines: r.lines,
        player: r._id,
      };
      table.push(game);
    }
    res.render("marathon_leaderboards", {
      data: table,
      url: `${
        process.env.BASE_URL || `localhost:${PORT}`
      }/marathon_leaderboards`,
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get("/api", (req, res) => {
  res.render("api");
});

//listen
server.listen(PORT, () => {
  console.log("server running");
});
