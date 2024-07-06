import { Router } from "express";
import { scrapeEmails } from "../services/scrapeService";

const router = Router();

router.post("/", async (req, res) => {
  const { url } = req.body;
  try {
    const emails = await scrapeEmails(url);
    res.json(emails);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

export default router;
