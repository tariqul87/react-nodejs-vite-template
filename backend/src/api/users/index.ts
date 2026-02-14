import express from "express";
import { type Request, type Response } from "express";
import { getUser } from './getUser'

const usersRouter = express.Router();
usersRouter.get("/:id", getUser);

export default usersRouter;
