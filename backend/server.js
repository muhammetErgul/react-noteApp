const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const cors = require("cors");
const { json } = require("body-parser");
const { nanoid } = require("nanoid");

dotenv.config({ path: "./config.env" });

const app = express();

app.use(cors());
app.use(json());

let notes = [];

app.get("/notes", (req, res) => res.send(notes));

// add notes
app.post("/notes", (req, res) => {
  const note = { id: nanoid(), value: req.body.value, color: req.body.color };
  const item = notes.find((note) => note.value === req.body.value);
  if (item) console.log("aynisinindan var");
  else {
    notes.push(note);
    return res.send(note);
  }
});
// delete notes
app.delete("/notes/:id", (req, res) => {
  const id = req.params.id;
  const index = notes.findIndex((note) => note.id == id);
  if (index > -1) {
    notes.splice(index, 1);
  }

  res.send(notes);
});
//  edit note
app.put("/notes/:id", (req, res) => {
  const id = req.params.id;
  const index = notes.findIndex((note) => note.id == id);
  const value = req.body.value;
  if (index > -1) {
    notes[index].value = value;
  }
  return res.send(notes[index]);
});

const PORT = 7000;

app.listen(PORT, console.log(`Server running on port ${PORT}`.green.bold));
