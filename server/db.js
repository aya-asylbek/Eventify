// server/db.js
import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";
dotenv.config();

// connect to db
const pool = new Pool({
   user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

// check
pool.connect()
  .then(() => console.log("✅ Connected to eventify_db"))
  .catch((err) => console.error("❌ Connection error:", err.message));

export default pool;
