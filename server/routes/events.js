import express from "express";
import pool from "../db.js";
import authMiddleware, { verifyRole } from "../middleware/authMiddleware.js";

const router = express.Router();

// ===== Get all events =====
router.get("/", authMiddleware, async (req, res) => {
  try {
    const role = req.user.role.toLowerCase(); // 💡 привели к нижнему регистру
    console.log("🧩 User Role:", role);
    let result;

    // Organizer: only their own events
    if (role === "organizer") {
      result = await pool.query(
        "SELECT * FROM events WHERE organizer_id = $1 ORDER BY date",
        [req.user.id]
      );
    }
    // Admin: all events
    else if (role === "admin") {
      result = await pool.query("SELECT * FROM events ORDER BY date");
    }
    // Attendee: only upcoming events
    else {
      result = await pool.query(
        "SELECT * FROM events WHERE date::date >= CURRENT_DATE ORDER BY date"
      );
    }

    console.log("✅ Events found:", result.rows.length);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching events:", err);
    res.status(500).json({ error: err.message });
  }
});

// ===== Create new event (organizer or admin) =====
router.post("/", authMiddleware, verifyRole(["organizer", "admin"]), async (req, res) => {
  const { title, description, date, venue, capacity } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO events (title, description, date, venue, capacity, organizer_id)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [title, description, date, venue, capacity, req.user.id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error creating event:", err);
    res.status(500).json({ error: err.message });
  }
});

// ===== Update event =====
router.put("/:id", authMiddleware, verifyRole(["organizer", "admin"]), async (req, res) => {
  const { id } = req.params;
  const { title, description, date, venue, capacity } = req.body;

  try {
    const check = await pool.query("SELECT * FROM events WHERE id = $1", [id]);
    if (check.rows.length === 0)
      return res.status(404).json({ message: "Event not found" });

    const event = check.rows[0];

    if (req.user.role === "organizer" && event.organizer_id !== req.user.id) {
      return res.status(403).json({ message: "You can only edit your own events" });
    }

    const result = await pool.query(
      `UPDATE events
       SET title=$1, description=$2, date=$3, venue=$4, capacity=$5
       WHERE id=$6
       RETURNING *`,
      [title, description, date, venue, capacity, id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error updating event:", err);
    res.status(500).json({ error: err.message });
  }
});

// ===== Delete event =====
router.delete("/:id", authMiddleware, verifyRole(["organizer", "admin"]), async (req, res) => {
  const { id } = req.params;

  try {
    const check = await pool.query("SELECT * FROM events WHERE id = $1", [id]);
    if (check.rows.length === 0)
      return res.status(404).json({ message: "Event not found" });

    const event = check.rows[0];

    if (req.user.role === "organizer" && event.organizer_id !== req.user.id) {
      return res.status(403).json({ message: "You can only delete your own events" });
    }

    await pool.query("DELETE FROM events WHERE id = $1", [id]);
    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    console.error("Error deleting event:", err);
    res.status(500).json({ error: err.message });
  }
});

// ===== Event Stats (registrations per event) =====
router.get("/stats", authMiddleware, verifyRole(["organizer", "admin"]), async (req, res) => {
  try {
    let query = `
      SELECT e.title, COUNT(r.id) AS registrations
      FROM events e
      LEFT JOIN registrations r ON e.id = r.event_id
    `;

    if (req.user.role === "organizer") {
      query += ` WHERE e.organizer_id = ${req.user.id} `;
    }

    query += ` GROUP BY e.title ORDER BY registrations DESC;`;

    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching stats:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
