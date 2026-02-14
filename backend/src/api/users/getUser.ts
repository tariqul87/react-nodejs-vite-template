import { type Request, type Response } from "express";

export function getUser(req: Request, res: Response) {
    const { id } = req.params;
    res.json({ id, message: `User ${id}` });
}