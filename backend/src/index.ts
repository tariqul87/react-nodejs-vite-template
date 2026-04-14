import express from "express";
import cors, { type CorsOptions } from "cors";
import cookieParser from "cookie-parser";
import { type Request, type Response } from "express";
import apiRouter from "./api";
import { corsOrigins, env } from "./config/env";
import { prisma } from "./db/client";

const app = express();
app.set("trust proxy", 1);
const port = env.PORT;
const normalizedAllowedOrigins = new Set(
  corsOrigins.map((origin) => origin.replace(/\/+$/, "").toLowerCase()),
);
const localhostOriginPattern = /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i;

const corsOptions: CorsOptions = {
  credentials: true,
  origin(origin, callback) {
    // Allow non-browser requests (curl/health checks) that omit Origin.
    if (!origin) {
      callback(null, true);
      return;
    }

    const normalizedOrigin = origin.replace(/\/+$/, "").toLowerCase();
    if (normalizedAllowedOrigins.has(normalizedOrigin)) {
      callback(null, true);
      return;
    }

    if (env.NODE_ENV !== "production" && localhostOriginPattern.test(normalizedOrigin)) {
      callback(null, true);
      return;
    }

    callback(null, false);
  },
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(cookieParser());
app.use(express.json({ limit: "200kb" }));

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello from the Node.js backend!" });
});

app.use("/api", apiRouter);

app.get("/healthz", async (_req: Request, res: Response) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return res.json({ status: "ok" });
  } catch {
    return res.status(503).json({ status: "degraded", message: "Database unavailable" });
  }
});

const server = app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});

async function shutdown(signal: string) {
  console.log(`Received ${signal}, shutting down gracefully...`);
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
}

process.on("SIGINT", () => {
  void shutdown("SIGINT");
});

process.on("SIGTERM", () => {
  void shutdown("SIGTERM");
});
