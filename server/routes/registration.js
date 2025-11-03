import express from "express";
import pool from "../db.js";
import authMiddleware, { verifyRole } from "../middleware/authMiddleware.js";

const router = express.Router();

// ===== Get all registrations for the logged-in user =====
router.get("/", authMiddleware, async (req, res) => {
  try {
    console.log("📥 Fetching registrations for user:", req.user.id);

    const result = await pool.query(
      `SELECT 
         r.id, 
         e.title, 
         e.date, 
         e.venue,
         r.ticket_type, 
         r.created_at, 
         r.event_id
       FROM registrations r
       LEFT JOIN events e ON r.event_id = e.id
       WHERE r.user_id = $1
       ORDER BY r.created_at DESC`,
      [req.user.id]
    );

    console.log("✅ Found registrations:", result.rows);
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Database error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ===== Register user for an event (only attendee) =====
router.post("/", authMiddleware, verifyRole(["attendee"]), async (req, res) => {
  const { event_id, ticket_type } = req.body;

  try {
    console.log("🟢 Registration attempt:", { user: req.user.id, event_id });

    // Check if already registered
    const existing = await pool.query(
      "SELECT * FROM registrations WHERE user_id = $1 AND event_id = $2",
      [req.user.id, event_id]
    );

    if (existing.rows.length > 0) {
      console.log("⚠️ Already registered");
      return res.status(400).json({ error: "Already registered for this event" });
    }

    // Create new registration
    const result = await pool.query(
      `INSERT INTO registrations (user_id, event_id, ticket_type)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [req.user.id, event_id, ticket_type || "Regular"]
    );

    console.log("✅ Registration successful:", result.rows[0]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("❌ Registration error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ===== Cancel registration (attendee only) =====
router.delete("/user/:id", authMiddleware, verifyRole(["attendee"]), async (req, res) => {
  const { id } = req.params;

  try {
    const registration = await pool.query(
      "SELECT * FROM registrations WHERE id = $1 AND user_id = $2",
      [id, req.user.id]
    );

    if (registration.rows.length === 0) {
      return res.status(403).json({ error: "Not authorized to cancel this registration" });
    }

    await pool.query("DELETE FROM registrations WHERE id = $1", [id]);
    res.json({ message: "Registration canceled successfully" });
  } catch (err) {
    console.error("❌ Cancel error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ===== Get all registrations (admin only) =====
router.get("/all", authMiddleware, verifyRole(["admin"]), async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
         r.id, 
         u.name AS user, 
         e.title AS event, 
         r.ticket_type, 
         r.created_at
       FROM registrations r
       JOIN users u ON r.user_id = u.id
       JOIN events e ON r.event_id = e.id
       ORDER BY r.created_at DESC`
    );
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Admin fetch error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ===== Delete registration (admin only) =====
router.delete("/:id", authMiddleware, verifyRole(["admin"]), async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM registrations WHERE id = $1", [id]);
    res.json({ message: "Registration deleted successfully" });
  } catch (err) {
    console.error("❌ Admin delete error:", err);
    res.status(500).json({ error: err.message });
  }
});


// ===== Get all registrations for events created by the logged-in organizer =====
router.get(
  "/organizer",
  authMiddleware,
  verifyRole(["organizer"]),
  async (req, res) => {
    try {
      const result = await pool.query(
        `SELECT 
           e.title AS event,
           u.name AS attendee,
           u.email,
           r.ticket_type,
           r.created_at
         FROM registrations r
         JOIN events e ON r.event_id = e.id
         JOIN users u ON r.user_id = u.id
         WHERE e.organizer_id = $1
         ORDER BY e.title, r.created_at DESC`,
        [req.user.id]
      );

      res.json(result.rows);
    } catch (err) {
      console.error("Error fetching organizer registrations:", err);
      res.status(500).json({ error: err.message });
    }
  }
);



export default router;
