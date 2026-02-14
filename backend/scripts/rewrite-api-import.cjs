const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "..", "dist", "index.js");
let code = fs.readFileSync(file, "utf8");
code = code.replace(/from\s+["']\.\/api["']/, 'from "./api/index.js"');
fs.writeFileSync(file, code);
