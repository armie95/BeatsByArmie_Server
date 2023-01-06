const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();
const playlist = require("./data/playlists.js");

app.get("/fullPlaylist", (req, res) => {
  res.status(200).send(playlist);
});

app.get("/mostPlayedSongs", (req, res) => {
  const mostPlayedSongs = JSON.parse(
    fs.readFileSync("./data/songs.json", "utf-8")
  );
  let findMostPlayed = mostPlayedSongs.filter((song) => song.views > 9);

  res.status(200).send({ songs: findMostPlayed });
});

app.get("/playlistSongs:id", (req, res) => {
  const id = req.params.id;
  const songsList = JSON.parse(fs.readFileSync("./data/songs.json", "utf-8"));
  let findSongs = songsList.filter(
    (song) => song.playlistId == id.split(":")[1]
  );
  let findPlaylist = playlist.find((song) => song.id == id.split(":")[1]);
  res.status(200).send({ songs: findSongs, playlist: findPlaylist });
});

app.post("/addComment", (req, res) => {
  const { comment, id } = req.body;
  let index = playlist.findIndex((item) => item.id == id.split(":")[1]);
  let newComments = [
    {
      id: Date.now(),
      name: "Arman",
      timestamp: Date.now(),
      comment: comment,
    },
    ...playlist[index].comments,
  ];
  playlist[index] = { ...playlist[index], comments: newComments };

  const songsList = JSON.parse(fs.readFileSync("./data/songs.json", "utf-8"));
  let findSongs = songsList.filter(
    (song) => song.playlistId == id.split(":")[1]
  );

  res.status(200).send({ songs: findSongs, playlist: playlist[index] });
});

app.use(express.static("assets"));

// Import Routes

// Route Middlewares

app.get("/get", (req, res) => {
  res.send("<h1>Home Page</h1>");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Server is running on http://localhost:8080");
});
