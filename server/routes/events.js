import express from "express";
import pool from "../db.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all events (public)
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM events ORDER BY date ASC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create new event (only organizer)
router.post("/", authMiddleware, async (req, res) => {
  const { title, description, date, venue, capacity } = req.body;

  if (req.user.role !== "organizer" && req.user.role !== "admin") {
    return res.status(403).json({ message: "Only organizers can create events" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO events (title, description, date, venue, capacity, created_by) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [title, description, date, venue, capacity, req.user.id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update event (organizer only)
router.put("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { title, description, date, venue, capacity } = req.body;

  if (req.user.role !== "organizer" && req.user.role !== "admin") {
    return res.status(403).json({ message: "Only organizers can update events" });
  }

  try {
    const result = await pool.query(
      "UPDATE events SET title=$1, description=$2, date=$3, venue=$4, capacity=$5 WHERE id=$6 RETURNING *",
      [title, description, date, venue, capacity, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete event (organizer or admin)
router.delete("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;

  if (req.user.role !== "organizer" && req.user.role !== "admin") {
    return res.status(403).json({ message: "Only organizers can delete events" });
  }

  try {
    await pool.query("DELETE FROM events WHERE id = $1", [id]);
    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
