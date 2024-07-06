import { Router } from "express";
import pool from "../utils/db";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM emails");
    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

export default router;
