const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleWare");
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  login,
} = require("../controllers/userController");

// Define routes

// router.get("/", getUsers);
router.get("/:id", auth, getUserById);
router.post("/", createUser);
router.put("/:id", auth, updateUser);
router.delete("/:id", auth, deleteUser);
router.post("/login", login);

module.exports = router;
