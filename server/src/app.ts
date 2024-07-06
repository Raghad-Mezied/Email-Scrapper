import express from "express";
import cors from "cors";
import { json } from "body-parser";
import { scrapeRouter, getEmailsRouter } from "./routes";

const app = express();

app.use(cors());
app.use(json());

app.use("/api/scrape", scrapeRouter);
app.use("/api/emails", getEmailsRouter);

export default app;
