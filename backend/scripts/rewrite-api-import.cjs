const fs = require("fs");
const path = require("path");

const distDir = path.join(__dirname, "..", "dist");

function rewriteFile(filePath, replacements) {
  if (!fs.existsSync(filePath)) {
    return;
  }

  let code = fs.readFileSync(filePath, "utf8");
  for (const [pattern, value] of replacements) {
    code = code.replace(pattern, value);
  }
  fs.writeFileSync(filePath, code);
}

// Fix main index: ./api -> ./api/index.js
const indexPath = path.join(distDir, "index.js");
rewriteFile(indexPath, [
  [/from\s+["']\.\/api["']/, 'from "./api/index.js"'],
  [/from\s+["']\.\/config\/env["']/g, 'from "./config/env.js"'],
  [/from\s+["']\.\/db\/client["']/g, 'from "./db/client.js"'],
]);

// Fix api/index.js: directory imports -> /index.js (Node ESM requires explicit extension)
const apiIndexPath = path.join(distDir, "api", "index.js");
rewriteFile(apiIndexPath, [
  [/from\s+["']\.\/users["']/g, 'from "./users/index.js"'],
  [/from\s+["']\.\/accounts["']/g, 'from "./accounts/index.js"'],
  [/from\s+["']\.\/hello["']/g, 'from "./hello/index.js"'],
  [/from\s+["']\.\/auth["']/g, 'from "./auth/index.js"'],
]);

// Fix api/users/index.js: ./getUser -> ./getUser.js
const usersIndexPath = path.join(distDir, "api", "users", "index.js");
rewriteFile(usersIndexPath, [[/from\s+["']\.\/getUser["']/g, 'from "./getUser.js"']]);

const authIndexPath = path.join(distDir, "api", "auth", "index.js");
rewriteFile(authIndexPath, [
  [/from\s+["']\.\.\/\.\.\/db\/client["']/g, 'from "../../db/client.js"'],
  [/from\s+["']\.\.\/\.\.\/auth\/password["']/g, 'from "../../auth/password.js"'],
  [/from\s+["']\.\.\/\.\.\/auth\/tokens["']/g, 'from "../../auth/tokens.js"'],
  [/from\s+["']\.\.\/\.\.\/auth\/middleware["']/g, 'from "../../auth/middleware.js"'],
  [/from\s+["']\.\.\/\.\.\/auth\/cookies["']/g, 'from "../../auth/cookies.js"'],
  [/from\s+["']\.\.\/\.\.\/middleware\/rateLimitAuth["']/g, 'from "../../middleware/rateLimitAuth.js"'],
]);

const authCookiesPath = path.join(distDir, "auth", "cookies.js");
rewriteFile(authCookiesPath, [
  [/from\s+["']\.\.\/config\/env["']/g, 'from "../config/env.js"'],
  [/from\s+["']\.\/tokens["']/g, 'from "./tokens.js"'],
]);

const authMiddlewarePath = path.join(distDir, "auth", "middleware.js");
rewriteFile(authMiddlewarePath, [[/from\s+["']\.\/tokens["']/g, 'from "./tokens.js"']]);

const authTokensPath = path.join(distDir, "auth", "tokens.js");
rewriteFile(authTokensPath, [[/from\s+["']\.\.\/config\/env["']/g, 'from "../config/env.js"']]);

const scriptsSeedPath = path.join(distDir, "scripts", "seedDemoUser.js");
rewriteFile(scriptsSeedPath, [
  [/from\s+["']\.\.\/db\/client["']/g, 'from "../db/client.js"'],
  [/from\s+["']\.\.\/config\/env["']/g, 'from "../config/env.js"'],
  [/from\s+["']\.\.\/auth\/password["']/g, 'from "../auth/password.js"'],
]);
