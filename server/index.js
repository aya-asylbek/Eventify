// server/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./db.js";
import authRoutes from "./routes/auth.js";
import authMiddleware from "./middleware/authMiddleware.js";
import eventRoutes from "./routes/events.js";
import registrationRoutes from "./routes/registration.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({ message: `Welcome, user ${req.user.id}!`, role: req.user.role });
});
app.use("/api/events", eventRoutes);
app.use("/api/registrations", registrationRoutes);

// test
app.get("/", (req, res) => {
  res.send("🎉 Eventify API is running!Yay!");
});

// check db
app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ message: "Database connected!", time: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// server
app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});
