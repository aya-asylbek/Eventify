// server/db.js
import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";
dotenv.config();

// connect to db
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// check connection
pool.connect()
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .catch((err) => console.error("❌ Connection error:", err.message));

export default pool;
