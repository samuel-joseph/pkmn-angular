const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const userSchema = new Schema({
//   username: { type: String, required: true, unique: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true }
// });

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

module.exports = mongoose.model("Item", itemSchema);
module.exports = mongoose.model("Trainer", trainerSchema);
