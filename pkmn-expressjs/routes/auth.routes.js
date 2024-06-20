const express = require("express");
const router = express.Router();
const { register, login, logout } = require("../controllers/authController");
const auth = require("../middlewares/authMiddleWare");

router.post("/auth/register", register);
router.post("/auth/login", login);
router.post("/auth/logout", auth, logout);

module.exports = router;
