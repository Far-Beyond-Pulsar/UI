"use client";

import { motion } from "framer-motion";
import { CodeBlock } from "@/components/ui/CodeBlock";
import Link from "next/link";

const SECTIONS = [
  {
    id: "installation",
    title: "Installation",
    content: (
      <>
        <p className="text-sm text-white/50 leading-relaxed mb-4">
          Add WGPUI as a git dependency in your Cargo.toml. WGPUI uses wgpu for GPU abstraction and winit for
          windowing, so no platform-specific setup is required.
        </p>
        <CodeBlock
          title="Cargo.toml"
          code={`[dependencies]
wgpui = { git = "https://github.com/Far-Beyond-Pulsar/WGPUI" }
wgpui-component = { git = "https://github.com/Far-Beyond-Pulsar/WGPUI-Component" }`}
        />
      </>
    ),
  },
  {
    id: "your-first-window",
    title: "Your First Window",
    content: (
      <>
        <p className="text-sm text-white/50 leading-relaxed mb-4">
          Create a simple application with a window and a basic element tree.
        </p>
        <CodeBlock
          title="src/main.rs"
          code={`use wgpui::*;

struct App;

impl Render for App {
    fn render(&mut self, _cx: &mut ViewContext<Self>) -> impl IntoElement {
        div()
            .flex()
            .size_full()
            .justify_center()
            .items_center()
            .bg(rgb(0x0c0c0c))
            .child(
                div()
                    .px_6()
                    .py_3()
                    .rounded_lg()
                    .bg(rgb(0x0ea5e9))
                    .text_color(rgb(0xffffff))
                    .child("Hello, WGPUI!")
            )
    }
}

fn main() {
    App::new().run(|cx: &mut AppContext| {
        cx.open_window(WindowOptions::default(), |cx| {
            cx.new_view(|_cx| App)
        });
    });
}`}
        />
        <p className="text-sm text-white/40 mt-4">
          Run with <code className="text-[#0ea5e9]">cargo run</code>. The same code compiles on Windows, macOS, Linux, and WASM.
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
          WGPUI uses a builder pattern for constructing UI element trees. Every element returns
          <code className="text-[#0ea5e9]"> impl IntoElement</code>, enabling composition.
        </p>
        <CodeBlock
          code={`use wgpui::*;

fn my_component(cx: &mut ViewContext<Self>) -> impl IntoElement {
    div()
        .flex()
        .flex_col()
        .gap_4()
        .p_6()
        .child(
            h1().text_xl().font_bold().child("Dashboard")
        )
        .child(
            div()
                .flex()
                .gap_3()
                .child(metric_card("Users", "1,234"))
                .child(metric_card("Revenue", "$8,910"))
                .child(metric_card("Active", "89%"))
        )
}

fn metric_card(label: &str, value: &str) -> impl IntoElement {
    div()
        .flex_1()
        .p_4()
        .rounded_lg()
        .bg(rgb(0x1a1a1a))
        .child(
            div()
                .flex()
                .flex_col()
                .gap_1()
                .child(
                    span()
                        .text_xs()
                        .text_color(rgb(0x888888))
                        .child(label)
                )
                .child(
                    span()
                        .text_2xl()
                        .font_bold()
                        .text_color(rgb(0xffffff))
                        .child(value)
                )
        )
}`}
        />
      </>
    ),
  },
  {
    id: "interactivity",
    title: "Interactivity & State",
    content: (
      <>
        <p className="text-sm text-white/50 leading-relaxed mb-4">
          Use <code className="text-[#0ea5e9]">Model</code> for shared state and
          <code className="text-[#0ea5e9]">Entity</code> for reactive updates.
        </p>
        <CodeBlock
          code={`use wgpui::*;

struct Counter {
    count: u32,
}

impl Counter {
    fn increment(&mut self, _: &ClickEvent, cx: &mut ViewContext<Self>) {
        self.count += 1;
        cx.notify();
    }

    fn decrement(&mut self, _: &ClickEvent, cx: &mut ViewContext<Self>) {
        self.count = self.count.saturating_sub(1);
        cx.notify();
    }
}

impl Render for Counter {
    fn render(&mut self, _cx: &mut ViewContext<Self>) -> impl IntoElement {
        div()
            .flex()
            .size_full()
            .justify_center()
            .items_center()
            .gap_4()
            .bg(rgb(0x0c0c0c))
            .child(
                button()
                    .px_4()
                    .py_2()
                    .rounded_lg()
                    .bg(rgb(0x333333))
                    .hover(|s| s.bg(rgb(0x444444)))
                    .on_click(cx.listener(Self::decrement))
                    .child("-")
            )
            .child(
                span()
                    .text_3xl()
                    .font_bold()
                    .text_color(rgb(0xffffff))
                    .child(self.count.to_string())
            )
            .child(
                button()
                    .px_4()
                    .py_2()
                    .rounded_lg()
                    .bg(rgb(0x0ea5e9))
                    .hover(|s| s.bg(rgb(0x0284c7)))
                    .on_click(cx.listener(Self::increment))
                    .child("+")
            )
    }
}`}
        />
      </>
    ),
  },
  {
    id: "theming",
    title: "Theming",
    content: (
      <>
        <p className="text-sm text-white/50 leading-relaxed mb-4">
          WGPUI uses JSON-based themes that can be swapped at runtime. Themes control colors,
          typography, spacing, and component-specific tokens.
        </p>
        <CodeBlock
          title="theme.json"
          code={`{
  "name": "pulsar-dark",
  "colors": {
    "surface": "#0c0c0c",
    "background": "#000000",
    "text": "#ffffff",
    "text_muted": "#888888",
    "accent": "#0ea5e9",
    "accent_hover": "#0284c7",
    "border": "rgba(255,255,255,0.07)",
    "error": "#ef4444",
    "success": "#22c55e"
  },
  "spacing": {
    "xs": "4px",
    "sm": "8px",
    "md": "16px",
    "lg": "24px",
    "xl": "32px"
  },
  "typography": {
    "font_family": "Inter, system-ui, sans-serif",
    "font_mono": "JetBrains Mono, monospace",
    "font_sizes": {
      "xs": "11px",
      "sm": "13px",
      "base": "15px",
      "lg": "18px",
      "xl": "24px",
      "2xl": "32px"
    }
  }
}`}
        />
      </>
    ),
  },
];

const SIDEBAR = [
  { label: "Installation", href: "#installation" },
  { label: "Your First Window", href: "#your-first-window" },
  { label: "Element Tree", href: "#element-tree" },
  { label: "Interactivity", href: "#interactivity" },
  { label: "Theming", href: "#theming" },
];

export default function DocsPage() {
  return (
    <div className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-5">
        <div className="flex gap-12">
          {/* Sidebar */}
          <aside className="hidden lg:block w-56 shrink-0 pt-12">
            <nav className="sticky top-32 flex flex-col gap-1">
              <p className="text-[10px] font-semibold tracking-widest uppercase text-white/20 mb-3">
                Getting Started
              </p>
              {SIDEBAR.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="text-sm text-white/40 hover:text-white transition-colors py-1"
                >
                  {label}
                </a>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <div className="flex-1 min-w-0 pt-12 pb-24">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-4xl font-bold tracking-tight mb-2">Documentation</h1>
              <p className="text-sm text-white/40 mb-12">
                Everything you need to build GPU-accelerated UIs with WGPUI.
              </p>
            </motion.div>

            {SECTIONS.map((section, i) => (
              <motion.div
                key={section.id}
                id={section.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="mb-14"
              >
                <h2 className="text-xl font-semibold text-white mb-4">{section.title}</h2>
                {section.content}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
