const express = require("express");
const {
  createMove,
  getAllMoves,
  updateMove,
  deleteMove,
  getMoveById,
} = require("../controllers/moveController");

const router = express.Router();

router.post("/moves", createMove);
router.get("/moves", getAllMoves);
router.get("/moves/:id", getMoveById);
router.put("/moves/:id", updateMove);
router.delete("/moves/:id", deleteMove);

module.exports = router;
