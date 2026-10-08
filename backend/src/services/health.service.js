import pool from "../config/database.js";

export async function getDatabaseHealth() {
  const result = await pool.query("SELECT NOW() AS time");

  return {
    database: "connected",
    time: result.rows[0].time,
  };
}