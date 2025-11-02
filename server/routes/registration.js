import express from "express";
import pool from "../db.js";
import authMiddleware, { verifyRole } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all registrations for the logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT r.id, e.title, e.date, r.ticket_type, r.created_at
       FROM registrations r
       JOIN events e ON r.event_id = e.id
       WHERE r.user_id = $1`,
      [req.user.id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Register user for an event (only attendee)
router.post("/", authMiddleware, verifyRole(["attendee"]), async (req, res) => {
  const { event_id, ticket_type } = req.body;

  try {
    // Check if already registered
    const existing = await pool.query(
      "SELECT * FROM registrations WHERE user_id = $1 AND event_id = $2",
      [req.user.id, event_id]
    );
    if (existing.rows.length > 0) {
      return res.status(400).json({ error: "Already registered for this event" });
    }

    // Create new registration
    const result = await pool.query(
      `INSERT INTO registrations (user_id, event_id, ticket_type)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [req.user.id, event_id, ticket_type || "Regular"]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all registrations (admin only)
router.get("/all", authMiddleware, verifyRole(["admin"]), async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT r.id, u.name AS user, e.title AS event, r.ticket_type, r.created_at
       FROM registrations r
       JOIN users u ON r.user_id = u.id
       JOIN events e ON r.event_id = e.id
       ORDER BY r.created_at DESC`
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete registration (admin)
router.delete("/:id", authMiddleware, verifyRole(["admin"]), async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM registrations WHERE id = $1", [id]);
    res.json({ message: "Registration deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
