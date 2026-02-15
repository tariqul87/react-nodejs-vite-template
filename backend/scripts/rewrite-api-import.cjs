const fs = require("fs");
const path = require("path");

const distDir = path.join(__dirname, "..", "dist");

// Fix main index: ./api -> ./api/index.js
const indexPath = path.join(distDir, "index.js");
let code = fs.readFileSync(indexPath, "utf8");
code = code.replace(/from\s+["']\.\/api["']/, 'from "./api/index.js"');
fs.writeFileSync(indexPath, code);

// Fix api/index.js: directory imports -> /index.js (Node ESM requires explicit extension)
const apiIndexPath = path.join(distDir, "api", "index.js");
code = fs.readFileSync(apiIndexPath, "utf8");
code = code.replace(/from\s+["']\.\/users["']/g, 'from "./users/index.js"');
code = code.replace(/from\s+["']\.\/accounts["']/g, 'from "./accounts/index.js"');
code = code.replace(/from\s+["']\.\/hello["']/g, 'from "./hello/index.js"');
fs.writeFileSync(apiIndexPath, code);

// Fix api/users/index.js: ./getUser -> ./getUser.js
const usersIndexPath = path.join(distDir, "api", "users", "index.js");
code = fs.readFileSync(usersIndexPath, "utf8");
code = code.replace(/from\s+["']\.\/getUser["']/g, 'from "./getUser.js"');
fs.writeFileSync(usersIndexPath, code);
