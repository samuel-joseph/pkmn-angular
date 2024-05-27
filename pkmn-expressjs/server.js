const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
const dbURI =
  "mongodb+srv://pinangayjoel:xZYAIG1NfoDPNkSU@cluster0.7siulj3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // Replace with your MongoDB connection string

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Define a schema
const itemSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  price: Number,
});

const trainerSchema = new mongoose.Schema({
  name: String,
  avatar: String,
  pokemons: Array,
  badges: Number,
});

// Define a model
const Item = mongoose.model("Item", itemSchema);
const Trainer = mongoose.model("Trainer", trainerSchema);

// CRUD operations

// Get all items
app.get("/api/items", (req, res) => {
  Item.find()
    .then((items) => res.json(items))
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.get("/api/trainer", (req, res) => {
  Trainer.find()
    .then((trainers) => res.json(trainers))
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.get("/api/trainer/:id", (req, res) => {
  Trainer.findById(req.params.id)
    .then((trainer) => res.json(trainer))
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Create a new item
app.post("/api/items", (req, res) => {
  const newItem = new Item({
    name: req.body.name,
    quantity: req.body.quantity,
    price: req.body.price,
  });
  newItem
    .save()
    .then((item) => res.json(item))
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.post("/api/trainer", (req, res) => {
  const newTrainer = new Trainer({
    name: req.body.name,
    avatar: req.body.avatar,
    pokemons: req.body.pokemons,
    badges: req.body.badges,
  });
  newTrainer
    .save()
    .then((item) => res.json(item))
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Update an item
app.put("/api/items/:id", (req, res) => {
  Item.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((item) => res.json(item))
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Delete an item
app.delete("/api/items/:id", (req, res) => {
  Item.findByIdAndDelete(req.params.id)
    .then(() => res.json({ message: "Item deleted" }))
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
