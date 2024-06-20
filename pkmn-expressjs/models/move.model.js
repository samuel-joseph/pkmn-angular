const mongoose = require("mongoose");

// Define the Move Schema
const statChangeSchema = new mongoose.Schema({
  change: {
    type: Number,
    required: true,
  },
  stat: {
    name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
});

const ailmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  chance: {
    type: Number,
    required: false,
  },
});

const maxHitSchema = new mongoose.Schema({
  min_hits: {
    type: Number,
    required: false,
  },
  max_hits: {
    type: Number,
    required: false,
  },
});

const damageClassSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ailment: {
    type: ailmentSchema,
    required: false,
  },
});

const moveSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  power: {
    type: Number,
    required: false,
  },
  pp: {
    type: Number,
    required: true,
  },
  ppMax: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  accuracy: {
    type: Number,
    required: false,
  },
  damageClass: {
    type: damageClassSchema,
    required: true,
  },
  effect_chance: {
    type: Number,
    default: null,
  },
  stat_changes: {
    type: [statChangeSchema],
    required: false,
  },
  priority: {
    type: Number,
    required: true,
  },
  hits: {
    type: maxHitSchema,
    required: false,
  },
  crit_rate: {
    type: Number,
    required: false,
  },
  moveFx: {
    type: String,
    required: true,
  },
  target: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  drain: {
    type: Number,
    required: false,
  },
});

// Create the Move model
const Move = mongoose.model("Move", moveSchema);

module.exports = Move;
