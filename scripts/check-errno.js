const fs = require("fs");
const lock = fs.readFileSync("C:/Users/redst/Documents/GitHub/WGPUI-Component/Cargo.lock", "utf-8");
const idx = lock.indexOf('name = "errno"');
if (idx >= 0) {
  console.log(lock.substring(idx, idx + 300));
} else {
  console.log("errno not in lock");
}
