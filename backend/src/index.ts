import express from "express";
import cors from "cors";
import { type Request, type Response } from "express";
import apiRouter from "./api";

const app = express();
const port = Number(process.env.PORT) || 3001;

const corsOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((s) => s.trim())
  : ["http://localhost:5173", "http://localhost:3000"];
app.use(cors({ origin: corsOrigins }));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello from the Node.js backend!" });
});

app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});
