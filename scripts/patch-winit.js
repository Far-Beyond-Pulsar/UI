const fs = require("fs");
const p = "D:/GitHub/WGPUI/Cargo.toml";
let c = fs.readFileSync(p, "utf-8");
// Change the WASM winit dep to disable default features
c = c.replace(
  '[target.\'cfg(target_family = "wasm")\'.dependencies]\ngetrandom',
  '[target.\'cfg(target_family = "wasm")\'.dependencies]\nwinit = { version = "0.30.12", default-features = false, features = ["rwh_06"] }\ngetrandom'
);
c = c.replace("winit = \"0.30.12\"\ngetrandom", "getrandom");
fs.writeFileSync(p, c, "utf-8");
console.log("patched wasm winit to no-default-features");
