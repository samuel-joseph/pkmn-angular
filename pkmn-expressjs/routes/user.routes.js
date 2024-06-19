const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleWare");
const {
  // getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

// Define routes

// router.get("/", getUsers);
router.get("/:id", auth, getUserById);
router.put("/", auth, updateUser);
router.delete("/:id", auth, deleteUser);

module.exports = router;
