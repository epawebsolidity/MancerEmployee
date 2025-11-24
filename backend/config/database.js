import dotenv from "dotenv";
import mysql from "mysql2/promise";
dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10
});

<<<<<<< HEAD
try {
  console.log("Connected to MySQL Database");
} catch (err) {
  console.error("Database connection failed:", err.message);
=======
// Cek koneksi
try {
  console.log("✅ Connected to MySQL Database");
} catch (err) {
  console.error("❌ Database connection failed:", err.message);
>>>>>>> fa65e95 (first commit)
}

export default db;
