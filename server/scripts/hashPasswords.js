import pkg from "pg";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pkg;

// connect to my db
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgresql://localhost:5432/eventify_db"
});

async function run() {
  try {
    const { rows } = await pool.query("SELECT id, password FROM users");
    for (const row of rows) {
      const { id, password } = row;
      // if easy password
      if (!password || password.length < 60) {
        const hashed = await bcrypt.hash(password || "changeme123", 10);
        await pool.query("UPDATE users SET password = $1 WHERE id = $2", [hashed, id]);
        console.log(`✅ Updated user ${id}`);
      } else {
        console.log(`➡️ User ${id} already hashed, skipping`);
      }
    }
    console.log("🎉 All done!");
  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    await pool.end();
  }
}

run();
