const User = require("../models/user.model");

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from the database
    res.json(users); // Respond with the list of users
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
};

// Get a single user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id); // Find user by ID
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user); // Respond with the user data
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
};

// Update an existing user
const updateUser = async (req, res) => {
  const userId = req.user.userId;
  const {
    username,
    email,
    password,
    pokemons,
    victory,
    perfectVictory,
    lose,
    totalGames,
  } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user properties if provided in request body
    user.username = username || user.username;
    user.email = email || user.email;
    user.pokemons = pokemons || user.pokemons;
    user.victory = victory || user.victory;
    user.perfectVictory = perfectVictory || user.perfectVictory;
    user.lose = lose || user.lose;
    user.totalGames = totalGames || user.totalGames;

    // Update password if provided
    if (password) {
      user.password = password;
      // Hash and save password securely
      // Example: user.password = await bcrypt.hash(password, 10);
    }

    await user.save();

    res.json({ message: "User updated successfully.", user });
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id); // Find and delete user by ID
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" }); // Respond with a success message
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
};

module.exports = {
  // getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
