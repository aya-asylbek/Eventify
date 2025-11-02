import express from "express";
import pool from "../db.js";
import authMiddleware, { verifyRole } from "../middleware/authMiddleware.js";

const router = express.Router();

// get registration of user
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

// post--- register of user
router.post("/", authMiddleware, verifyRole(["attendee"]), async (req, res) => {
  const { event_id, ticket_type } = req.body;

  try {
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

export default router;
