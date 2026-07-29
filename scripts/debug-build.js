const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const R = "D:\\GitHub\\UI";
const slug = "counter";
const outDir = path.join(R, "public", "wasm", slug);
const crateDir = path.join(R, "public", "wasm", slug, "_crate");

if (fs.existsSync(crateDir)) fs.rmSync(crateDir, { recursive: true });
fs.mkdirSync(path.join(crateDir, "src"), { recursive: true });

const src = fs.readFileSync(path.join(R, "examples", "counter.rs"), "utf-8");
console.log("Original source:", src.length, "bytes");

let cleaned = src.replace(/^\/\/!.*$/gm, "").replace(/\n{3,}/g, "\n\n");
let body = cleaned.replace(
  /^pub fn main\(\s*\)\s*\{/m,
  '#[wasm_bindgen(start)]\npub fn start() {\n    console_error_panic_hook::set_once();'
);
const libContent = "use wasm_bindgen::prelude::*;\n\n" + body;
fs.writeFileSync(path.join(crateDir, "src", "lib.rs"), libContent, "utf-8");
console.log("Lib.rs written:", libContent.length, "bytes");

fs.writeFileSync(
  path.join(crateDir, "Cargo.toml"),
  [
    '[package]',
    'name = "wgpui-counter"',
    'version = "0.1.0"',
    'edition = "2021"',
    '[package.metadata.wasm-pack.profile.release]',
    'wasm-opt = false',
    '[lib]',
    'crate-type = ["cdylib"]',
    '[dependencies]',
    'gpui-ce = { path = "D:/GitHub/WGPUI" }',
    'wasm-bindgen = "0.2"',
    'console_error_panic_hook = "0.1"',
    'getrandom = { version = "0.4", features = ["wasm_js"] }',
    'web-sys = { version = "0.3", features = ["Window", "Performance"] }',
  ].join("\n"),
  "utf-8"
);

console.log("Building with wasm-pack...");
try {
  execSync(`wasm-pack build --target web --out-dir "${outDir}" --out-name wgpui_counter "${crateDir}"`, {
    stdio: "pipe",
    timeout: 600000,
    env: { ...process.env, CARGO_TARGET_DIR: path.join(R, "target", "wc") },
  });
  console.log("wasm-pack succeeded");
} catch (e) {
  const msg = (e.stderr || e.stdout || e.message || "").toString();
  if (msg.includes("wasm-opt") || msg.includes("UNREACHABLE")) {
    console.log("wasm-opt crashed (expected on Windows), build data should exist");
  } else {
    console.error("BUILD FAILED:", msg.slice(0, 500));
    process.exit(1);
  }
}

const wasmPath = path.join(outDir, "wgpui_counter_bg.wasm");
if (fs.existsSync(wasmPath)) {
  const size = fs.statSync(wasmPath).size;
  console.log("WASM size:", (size / 1024).toFixed(0), "KB");
} else {
  console.log("WASM NOT FOUND at", wasmPath);
  console.log("Directory contents:", fs.readdirSync(outDir));
}
