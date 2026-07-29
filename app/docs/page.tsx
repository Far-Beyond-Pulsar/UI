"use client";

import { motion } from "framer-motion";
import { CodeBlock } from "@/components/ui/CodeBlock";

const SECTIONS = [
  {
    id: "installation",
    title: "Installation",
    content: (
      <>
        <p className="text-sm text-white/50 leading-relaxed mb-4">
          Add gpui-ce as a git dependency in your Cargo.toml. It uses wgpu for GPU abstraction and winit for
          windowing, so no platform-specific setup is required.
        </p>
        <CodeBlock title="Cargo.toml" code={`[dependencies]
gpui-ce = { git = "https://github.com/Far-Beyond-Pulsar/WGPUI" }`} />
      </>
    ),
  },
  {
    id: "your-first-window",
    title: "Your First Window",
    content: (
      <>
        <p className="text-sm text-white/50 leading-relaxed mb-4">
          Create a window with a basic element tree. The entry point is <code className="text-[#0ea5e9]">Application::new().run()</code>.
        </p>
        <CodeBlock title="src/main.rs" code={`use gpui::*;

struct HelloApp;

impl Render for HelloApp {
    fn render(&mut self, _window: &mut Window, cx: &mut Context<Self>) -> impl IntoElement {
        cx.notify();
        div()
            .flex()
            .size_full()
            .justify_center()
            .items_center()
            .bg(rgb(0x0c0c0c))
            .text_color(rgb(0xffffff))
            .child(
                div()
                    .px_6()
                    .py_3()
                    .rounded_xl()
                    .bg(rgb(0x0ea5e9))
                    .child("Hello, WGPUI!")
            )
    }
}

fn main() {
    Application::new().run(|cx: &mut App| {
        cx.open_window(WindowOptions::default(), |_, cx| {
            cx.new(|_| HelloApp)
        }).unwrap();
    });
}`} />
        <p className="text-sm text-white/40 mt-4">
          Run with <code className="text-[#0ea5e9]">cargo run</code>. The same code compiles on Windows, macOS, Linux, and WASM.
          On WASM, call <code className="text-[#0ea5e9]">cx.activate(true)</code> after opening the window.
        </p>
      </>
    ),
  },
  {
    id: "element-tree",
    title: "Element Tree",
    content: (
      <>
        <p className="text-sm text-white/50 leading-relaxed mb-4">
          GPUI uses a builder pattern for constructing UI element trees. Every element returns
          <code className="text-[#0ea5e9]"> impl IntoElement</code>, enabling composition. Text is added via
          <code className="text-[#0ea5e9]"> .child("text")</code> — there are no <code className="text-[#0ea5e9]">span()</code>
          or <code className="text-[#0ea5e9]">h1()</code> element functions.
        </p>
        <CodeBlock code={`use gpui::*;

fn metric_card(label: &str, value: &str) -> impl IntoElement {
    div()
        .flex_1()
        .p_4()
        .rounded_lg()
        .bg(rgb(0x1a1a1a))
        .child(
            div().flex().flex_col().gap_1()
                .child(div().text_xs().text_color(rgb(0x888888)).child(label.to_string()))
                .child(div().text_2xl().font_weight(FontWeight::BOLD).text_color(rgb(0xffffff)).child(value.to_string()))
        )
}

fn dashboard() -> impl IntoElement {
    div()
        .flex()
        .flex_col()
        .gap_4()
        .p_6()
        .child(div().text_xl().font_weight(FontWeight::BOLD).child("Dashboard"))
        .child(div().flex().gap_3()
            .child(metric_card("Users", "1,234"))
            .child(metric_card("Revenue", "$8,910"))
            .child(metric_card("Active", "89%"))
        )
}`} />
        <p className="text-sm text-white/40 mt-4">
          Style shortcuts: <code className="text-[#0ea5e9]">flex_1()</code>, <code className="text-[#0ea5e9]">px_4()</code>,
          <code className="text-[#0ea5e9]">py_2()</code>, <code className="text-[#0ea5e9]">gap_4()</code>,
          <code className="text-[#0ea5e9]">rounded_lg()</code>, <code className="text-[#0ea5e9]">border_1()</code>,
          <code className="text-[#0ea5e9]">w_full()</code>, <code className="text-[#0ea5e9]">text_size(px(24.0))</code>,
          <code className="text-[#0ea5e9]">hover(|s| s.bg(rgb(0x...)))</code>
        </p>
      </>
    ),
  },
  {
    id: "interactivity",
    title: "Interactivity & State",
    content: (
      <>
        <p className="text-sm text-white/50 leading-relaxed mb-4">
          Elements need <code className="text-[#0ea5e9">.id()</code> for <code className="text-[#0ea5e9]">on_click</code>
          to work. Listeners receive <code className="text-[#0ea5e9]">(this, event, window, cx)</code> — 4 arguments.
          Always call <code className="text-[#0ea5e9]">cx.notify()</code> after state changes.
        </p>
        <CodeBlock code={`use gpui::*;

struct Counter {
    count: i32,
}

impl Render for Counter {
    fn render(&mut self, _window: &mut Window, cx: &mut Context<Self>) -> impl IntoElement {
        cx.notify();
        div()
            .flex()
            .size_full()
            .justify_center()
            .items_center()
            .gap_4()
            .bg(rgb(0x0c0c0c))
            .text_color(rgb(0xffffff))
            .child(
                div().flex().items_center().gap_4()
                    .child(
                        div()
                            .id("dec")
                            .px_4().py_2().rounded_lg()
                            .bg(rgb(0x333333))
                            .hover(|s| s.bg(rgb(0x444444)))
                            .on_click(cx.listener(|this, _event, _window, cx| {
                                this.count -= 1;
                                cx.notify();
                            }))
                            .child("-")
                    )
                    .child(
                        div()
                            .text_size(px(32.0))
                            .font_weight(FontWeight::BOLD)
                            .child(self.count.to_string())
                    )
                    .child(
                        div()
                            .id("inc")
                            .px_4().py_2().rounded_lg()
                            .bg(rgb(0x0ea5e9))
                            .hover(|s| s.bg(rgb(0x0284c7)))
                            .on_click(cx.listener(|this, _event, _window, cx| {
                                this.count += 1;
                                cx.notify();
                            }))
                            .child("+")
                    )
            )
    }
}

fn main() {
    Application::new().run(|cx: &mut App| {
        cx.open_window(WindowOptions::default(), |_, cx| {
            cx.new(|_| Counter { count: 0 })
        }).unwrap();
    });
}`} />
        <p className="text-sm text-white/40 mt-4">
          Gotchas: on WASM, the <code className="text-[#0ea5e9]">render()</code> method should call
          <code className="text-[#0ea5e9]">cx.notify()</code> at the top to keep the frame loop running.
          Without it, events may not fire.
        </p>
      </>
    ),
  },
  {
    id: "wasm",
    title: "WASM Build",
    content: (
      <>
        <p className="text-sm text-white/50 leading-relaxed mb-4">
          Compile GPUI apps to WebAssembly with <code className="text-[#0ea5e9]">wasm-pack</code>.
          The entry point must use <code className="text-[#0ea5e9]">#[wasm_bindgen(start)]</code> and
          call <code className="text-[#0ea5e9]">console_error_panic_hook::set_once()</code>.
        </p>
        <CodeBlock title="Cargo.toml" code={`[package]
name = "my-app"
version = "0.1.0"
edition = "2021"

[lib]
crate-type = ["cdylib"]

[dependencies]
gpui-ce = { git = "https://github.com/Far-Beyond-Pulsar/WGPUI" }
wasm-bindgen = "0.2"
console_error_panic_hook = "0.1"

[package.metadata.wasm-pack.profile.release]
wasm-opt = false`} />
        <CodeBlock title="src/lib.rs" code={`use gpui::*;
use wasm_bindgen::prelude::*;

#[wasm_bindgen(start)]
pub fn start() {
    console_error_panic_hook::set_once();
    Application::new().run(|cx: &mut App| {
        // On WASM, winit throws for control flow — catch in JS
        cx.activate(true);
        cx.open_window(WindowOptions::default(), |_, cx| {
            cx.new(|_| MyView)
        }).unwrap();
    });
}`} />
        <CodeBlock title="index.html" code={`<!DOCTYPE html>
<html>
<head>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { width: 100%; height: 100%; background: #000; }
    canvas { display: block; width: 100%; height: 100%; }
  </style>
</head>
<body>
  <script type="module">
    import init from "./pkg/my_app.js";
    try { await init(); }
    catch (e) {
      if (!String(e).includes("exceptions for control flow")) throw e;
    }
  </script>
</body>
</html>`} />
        <p className="text-sm text-white/40 mt-4">
          Build: <code className="text-[#0ea5e9]">wasm-pack build --target web --out-dir pkg</code>
        </p>
      </>
    ),
  },
];

export default function DocsPage() {
  return (
    <div className="bg-black text-white">
      <div className="max-w-4xl mx-auto px-5 pb-24 pt-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Documentation</h1>
          <p className="text-sm text-white/40">Getting started with GPUI.</p>
        </motion.div>
        {SECTIONS.map((section, i) => (
          <motion.div key={section.id} id={section.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="mb-14">
            <h2 className="text-xl font-semibold text-white mb-4">{section.title}</h2>
            {section.content}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
