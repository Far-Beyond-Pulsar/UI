const fs = require("fs");
const lock = fs.readFileSync("D:/GitHub/WGPUI/Cargo.lock", "utf-8");
const i = lock.indexOf('name = "web-sys"');
if (i >= 0) console.log(lock.substring(i, i + 200));
else console.log("web-sys not in lock");
