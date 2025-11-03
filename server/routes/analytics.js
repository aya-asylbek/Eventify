import express from "express";
import pool from "../db.js";
import authMiddleware, { verifyRole } from "../middleware/authMiddleware.js";

const router = express.Router();

// Analytics (admin + organizer)
router.get("/", authMiddleware, verifyRole(["admin", "organizer"]), async (req, res) => {
  try {
    let query;
    let params = [];

    // Admin see all data
    if (req.user.role === "admin") {
      query = `
        SELECT 
          e.title AS event,
          COUNT(r.id) AS registrations,
          e.price,
          (COUNT(r.id) * e.price) AS revenue
        FROM events e
        LEFT JOIN registrations r ON e.id = r.event_id
        GROUP BY e.title, e.price
        ORDER BY registrations DESC;
      `;
    }
    // Organizer sees only his data
    else {
      query = `
        SELECT 
          e.title AS event,
          COUNT(r.id) AS registrations,
          e.price,
          (COUNT(r.id) * e.price) AS revenue
        FROM events e
        LEFT JOIN registrations r ON e.id = r.event_id
        WHERE e.organizer_id = $1
        GROUP BY e.title, e.price
        ORDER BY registrations DESC;
      `;
      params = [req.user.id];
    }

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Analytics error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
