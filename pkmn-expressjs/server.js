const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const moveRoutes = require("./routes/move.routes");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.get("/healthz", (_req, res) => res.send("ok"));

const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// 🔥 Explicit CORS config
app.use(
  cors({
    origin: [
      "http://localhost:4200", // Angular dev server
      "https://the-pokemon-stadium-battle.web.app", // your Firebase-hosted Angular app (adjust if different)
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", moveRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
