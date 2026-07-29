const fs = require("fs");
const lock = fs.readFileSync("D:/GitHub/WGPUI-Component/Cargo.lock", "utf-8");
const target = process.argv[2] || "zstd-sys";
const idx = lock.indexOf(`name = "${target}"`);
if (idx < 0) { console.log(`${target} not found`); process.exit(0); }
// Find which packages depend on this
const deps = [];
let pos = 0;
while (true) {
  const di = lock.indexOf(`"${target}"`, pos);
  if (di < 0) break;
  // Find the package that contains this dependency reference
  const pkgStart = lock.lastIndexOf("[[package]]", di);
  const nameMatch = lock.substring(pkgStart, di).match(/name = "([^"]+)"/);
  if (nameMatch) deps.push(nameMatch[1]);
  pos = di + 1;
}
console.log(`${target} is depended on by:`);
deps.forEach(d => console.log(`  - ${d}`));
