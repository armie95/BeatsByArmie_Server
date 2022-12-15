const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

app.get("/fullPlaylist", (req, res) => {
  const playlist = JSON.parse(
    fs.readFileSync("./data/playlists.json", "utf-8")
  );
  res.status(200).send(playlist);
});

app.get("/playlistSongs:id", (req, res) => {
  const id = req.params.id;
  const songsList = JSON.parse(fs.readFileSync("./data/songs.json", "utf-8"));
  let findSongs = songsList.filter(
    (song) => song.playlistId == id.split(":")[1]
  );
  res.status(200).send(findSongs);
});

app.use(express.static("assets"));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Server is running on http://localhost:8080");
});
