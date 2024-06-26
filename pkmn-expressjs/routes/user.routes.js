const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleWare");
const {
  getUsers,
  getChampions,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

// Define routes

router.get("/user/", getUsers);
router.get("/user/champions", getChampions);
router.get("/user/:id", auth, getUserById);
router.put("/user/", auth, updateUser);
router.delete("/user/:id", auth, deleteUser);

module.exports = router;
