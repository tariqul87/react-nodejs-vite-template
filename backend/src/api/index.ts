import express from "express";
import usersRouter from "./users";
import accountsRouter from "./accounts";
import helloRouter from "./hello";
import authRouter from "./auth";

const router = express.Router();

router.use("/users", usersRouter);
router.use("/accounts", accountsRouter);
router.use("/hello", helloRouter);
router.use("/auth", authRouter);

export default router;
