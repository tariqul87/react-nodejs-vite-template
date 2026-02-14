import express from "express";
import { type Request, type Response } from "express";

const helloRouter = express.Router();
helloRouter.get("/", (req: Request, res: Response) => {
  return res.json({ message: "Hello from the API" });
});

export default helloRouter;
