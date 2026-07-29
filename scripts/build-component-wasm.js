/**
 * build-component-wasm.js
 * Compiles components_src/ Rust files to WASM via wasm-pack.
 * Generates HTML shells for each and stores in public/wasm-components/
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const R = "D:\\GitHub\\UI";
const SRC = path.join(R, "components_src");
const OUT = path.join(R, "public", "wasm-components");
const TARGET = path.join(R, "target", "wc-comp");
const CRATE_DIR = path.join(R, "target", "wc-crates");

const uiPath = "C:/Users/redst/Documents/GitHub/WGPUI-Component/crates/ui";
const hasUi = fs.existsSync(uiPath);

const files = fs.readdirSync(SRC).filter((f) => f.endsWith(".rs"));

for (const file of files) {
  const slug = file.replace(/_/g, "-").replace(".rs", "");
  const outDir = path.join(OUT, slug);
  const crateDir = path.join(CRATE_DIR, slug);
  const crateSrc = path.join(crateDir, "src");

  fs.mkdirSync(crateSrc, { recursive: true });

  let src = fs.readFileSync(path.join(SRC, file), "utf-8");
  src = src.replace(/^\/\/!.*$/gm, "").replace(/\n{3,}/g, "\n\n");
  // Add ui::init(cx) before open_window if ui crate is available
  let uiInitBlock = hasUi ? '\n    ui::init(cx);\n    ' : '\n    ';
  src = src.replace(
    /fn main\s*\(\s*\)\s*\{/m,
    '#[wasm_bindgen(start)]\npub fn start() {\n    console_error_panic_hook::set_once();'
  );
  src = src.replace(
    /Application::new\(\)\.run\(\|cx: &mut App\| {/,
    `Application::new().run(|cx: &mut App| {${uiInitBlock}`
  );

  fs.writeFileSync(path.join(crateSrc, "lib.rs"), "use wasm_bindgen::prelude::*;\n\n" + src, "utf-8");

  const deps = ['gpui-ce = { path = "D:/GitHub/WGPUI" }', 'wasm-bindgen = "0.2"', 'console_error_panic_hook = "0.1"'];
  if (hasUi) deps.push(`ui = { path = "${uiPath}" }`);

  fs.writeFileSync(
    path.join(crateDir, "Cargo.toml"),
    [
      '[package]', `name = "wc-${slug}"`, 'version = "0.1.0"', 'edition = "2021"',
      '[package.metadata.wasm-pack.profile.release]', 'wasm-opt = false',
      '[lib]', 'crate-type = ["cdylib"]',
      '[dependencies]', ...deps,
    ].join("\n"),
    "utf-8"
  );

  process.stdout.write(`  ${slug}...`);
  const wasmName = `wc_${slug.replace(/-/g, "_")}`;

  try {
    execSync(`wasm-pack build --target web --out-dir "${outDir}" --out-name "${wasmName}" "${crateDir}"`, {
      stdio: "pipe", timeout: 600000,
      env: { ...process.env, CARGO_TARGET_DIR: TARGET },
    });
    console.log(" OK");
  } catch (e) {
    const wasmPath = path.join(outDir, `${wasmName}_bg.wasm`);
    if (fs.existsSync(wasmPath) && fs.statSync(wasmPath).size > 100000) {
      console.log(" OK (wasm-opt crash)");
    } else {
      const msg = (e.stderr || e.stdout || "").toString().split("\n").filter(l => l.includes("error[") || l.includes("Error:")).slice(-1).join("; ");
      console.log(` FAIL: ${msg || e.message.slice(0, 100)}`);
      continue;
    }
  }

  const html = [
    '<!DOCTYPE html><html><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/>',
    '<style>*{margin:0;padding:0;box-sizing:border-box}html,body{width:100%;height:100%;overflow:hidden;background:#000}canvas{display:block;width:100%;height:100%}</style></head>',
    `<body><script type="module">import init from "./${wasmName}.js";try{await init()}catch(e){if(!String(e).includes("exceptions for control flow"))throw e}<\/script></body></html>`,
  ].join("\n");
  fs.writeFileSync(path.join(outDir, "index.html"), html, "utf-8");

  if (fs.existsSync(crateDir)) fs.rmSync(crateDir, { recursive: true, force: true });
}

console.log("done");
