const mongoose = require("mongoose");
const argon2 = require("argon2");

const statSchema = new mongoose.Schema({
  base_stat: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
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

const typeSchema = new mongoose.Schema({
  typeOne: {
    type: String,
    required: true,
  },
  typeTwo: {
    type: String,
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

const statModelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

const statChangeSchema = new mongoose.Schema({
  change: {
    type: Number,
    required: true,
  },
  stat: statModelSchema,
});

const moveSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
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

const originalValueSchema = new mongoose.Schema({
  front_image: {
    type: String,
    required: true,
  },
  back_image: {
    type: String,
    required: true,
  },
  move_power: {
    type: Number,
    required: false,
  },
  min_hits: {
    type: Number,
    required: false,
  },
});

const metaSchema = new mongoose.Schema({
  stats: {
    type: [statSchema],
    required: true,
  },
  originalValues: {
    type: originalValueSchema,
    required: true,
  },
  condition: {
    type: String,
    required: false,
  },
  canMegaEvolve: {
    type: Boolean,
    required: false,
  },
  isMegaEvolve: {
    type: Boolean,
    required: false,
  },
});

// Define the schema
const pokemonSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  stats: {
    type: [statSchema],
    required: true,
  },
  types: {
    type: typeSchema,
    required: true,
  },
  moves: {
    type: [moveSchema],
    required: false,
  },
  dbMoves: {
    type: [moveSchema],
    required: false,
  },
  front_image: {
    type: String,
    required: true,
  },
  back_image: {
    type: String,
    required: true,
  },
  maxHp: {
    type: String,
    required: true,
  },
  currentHp: {
    type: String,
    required: true,
  },
  others: {
    type: metaSchema,
    required: false,
  },
  status: {
    type: String,
    required: false,
  },
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  pokemons: {
    type: [pokemonSchema],
    required: true,
  },
  victory: {
    type: Number,
    default: 0,
  },
  lose: {
    type: Number,
    default: 0,
  },
  perfectVictory: {
    type: Number,
    default: 0,
  },
  totalGames: {
    type: Number,
    default: 0,
  },
  password: {
    type: String,
    required: true,
    maxlength: 100,
  },
  champion: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save middleware to hash the password before saving
userSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    try {
      const hashedPassword = await argon2.hash(this.password);
      this.password = hashedPassword;
      next();
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (password) {
  try {
    return await argon2.verify(this.password, password);
  } catch (err) {
    throw new Error(err);
  }
};

// Create the User model
const User = mongoose.model("User", userSchema);

module.exports = User;
