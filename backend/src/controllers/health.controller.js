import { getDatabaseHealth } from "../services/health.service.js";

export async function healthCheck(req, res) {
  try {
    const result = await getDatabaseHealth();

    res.json(result);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      database: "disconnected",
    });
  }
}