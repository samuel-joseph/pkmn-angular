const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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

// Create a new user
const createUser = async (req, res) => {
  const { username, email, pokemons, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      pokemons,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
};

// Update an existing user
const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }); // Find and update user by ID
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user); // Respond with the updated user data
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

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const isMatch = await bcrypt.compare(
      password,
      hashedPassword,
      (err, result) => {
        if (err) {
          console.error("Error comparing passwords:", err);
          return;
        }
        console.log("Passwords match:", result); // result will be true if they match, false otherwise
      }
    );
    if (isMatch === false) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error." + error });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  login,
};
