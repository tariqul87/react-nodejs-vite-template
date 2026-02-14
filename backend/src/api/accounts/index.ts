import express from "express";
import { type Request, type Response } from "express";

function getAccount(req: Request, res: Response) {
  const { id } = req.params;
  res.json({ id, message: `Account ${id}` });
}

const accountsRouter = express.Router();
accountsRouter.get("/:id", getAccount);

export default accountsRouter;
