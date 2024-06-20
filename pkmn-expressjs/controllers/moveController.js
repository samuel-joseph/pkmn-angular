const Move = require("../models/move.model");

// Create a new move
exports.createMove = async (req, res) => {
  try {
    const existingMove = await Move.findOne({ id: req.body.id });
    if (existingMove) {
      return res
        .status(400)
        .json({ error: "Move with this id already exists" });
    }

    const move = new Move(req.body);
    await move.save();
    res.status(201).json(move);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all moves
exports.getAllMoves = async (req, res) => {
  try {
    const moves = await Move.find();
    res.status(200).json(moves);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single move by ID
exports.getMoveById = async (req, res) => {
  try {
    const move = await Move.findOne({ id: req.params.id });
    if (!move) {
      return res.status(404).json({ error: "Move not found" });
    }
    res.status(200).json(move);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a move
exports.updateMove = async (req, res) => {
  try {
    const move = await Move.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!move) {
      return res.status(404).json({ error: "Move not found" });
    }
    res.status(200).json(move);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a move
exports.deleteMove = async (req, res) => {
  try {
    const move = await Move.findByIdAndDelete(req.params.id);
    if (!move) {
      return res.status(404).json({ error: "Move not found" });
    }
    res.status(200).json({ message: "Move deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
