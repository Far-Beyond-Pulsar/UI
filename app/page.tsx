"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Github, ArrowRight, Layers, Monitor, Puzzle, Paintbrush, Code, PanelRightOpen } from "lucide-react";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { p } from "@/lib/utils";

const FEATURES = [
  {
    icon: Monitor,
    title: "One Backend, Every Platform",
    desc: "Unified wgpu + winit backend replaces Metal/Vulkan/D3D12/Cocoa/Win32/Wayland — one code path compiles to Windows, macOS, Linux, and WASM.",
  },
  {
    icon: Layers,
    title: "GPU-Accelerated Rendering",
    desc: "Full GPU-driven UI pipeline with glyphon text atlas, resvg SVG rendering, and custom wgpu shaders.",
  },
  {
    icon: Puzzle,
    title: "Rich Component Library",
    desc: "40+ reusable primitives — buttons, menus, tabs, dropdowns, modals, sliders, trees, virtual lists, and more.",
  },
  {
    icon: Paintbrush,
    title: "JSON Theme System",
    desc: "Runtime-switchable themes via JSON. 20+ included themes with full color, typography, and spacing control.",
  },
  {
    icon: Code,
    title: "Tree-Sitter Code Editor",
    desc: "Embeddable code editor with tree-sitter syntax highlighting, ropey text buffers, multi-cursor editing.",
  },
  {
    icon: PanelRightOpen,
    title: "Profiler & Inspector",
    desc: "Built-in GPU profiler and UI inspector with custom wgpu compute shaders for performance visualization.",
  },
];

export default function Page() {
  return (
    <div className="bg-black text-white overflow-x-hidden">
      {/* ─── Hero ─── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0ea5e9]/5 via-black/50 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />

        <div className="relative z-10 w-full max-w-4xl mx-auto px-5 flex flex-col items-center text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white/40 mb-8"
          >
            <span className="w-8 h-px bg-[#38bdf8]/70" />
            01 / Overview — WGPUI
            <span className="h-3 w-px bg-white/15" />
            Cross-platform · GPU-accelerated
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <Image src={p("/logos/wgpui.png")} alt="" width={160} height={160} className="mx-auto mb-6 opacity-90" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.55 }}
            className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-[-0.03em] leading-none text-white mb-5"
          >
            GPU UI for <span className="text-outline-accent" data-text="every platform.">every platform.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="text-base sm:text-lg text-white/50 max-w-xl mx-auto mb-10 leading-relaxed font-light"
          >
            A cross-platform GPU-accelerated UI framework for Rust, built on wgpu and winit.
            One codebase compiles to Windows, macOS, Linux, and WebAssembly.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <a
              href="https://github.com/Far-Beyond-Pulsar/WGPUI"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-mono text-[12px] uppercase tracking-[0.12em] rounded-md transition-colors"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/Far-Beyond-Pulsar/WGPUI"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/[0.15] hover:border-white/30 bg-white/[0.04] hover:bg-white/[0.07] text-white/80 hover:text-white font-mono text-[12px] uppercase tracking-[0.12em] rounded-md transition-all backdrop-blur-sm"
            >
              <Github className="w-4 h-4" /> View on GitHub
            </a>
          </motion.div>

          {/* Mono spec row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-14 flex items-center gap-6 font-mono text-[11px] uppercase tracking-[0.14em] text-white/30"
          >
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0ea5e9] animate-pulse-dot" />
              wgpu · winit
            </span>
            <span className="hidden sm:block h-3 w-px bg-white/15" />
            <span className="hidden sm:block">Rust · 100%</span>
            <span className="hidden sm:block h-3 w-px bg-white/15" />
            <span className="hidden sm:block">40+ components</span>
          </motion.div>
        </div>
      </section>

      <div className="divider mx-auto max-w-4xl" />

      {/* ─── Quick Start with code ─── */}
      <section className="py-24 px-5">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="mb-12"
          >
            <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white/40 mb-4">
              <span className="w-8 h-px bg-[#38bdf8]/70" />
              02 / Quick Start
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              Quick Start
            </h2>
             <p className="text-white/40 text-sm">
               Add gpui-ce to your Cargo.toml and start building GPU-accelerated UIs in minutes.
             </p>
          </motion.div>

          <CodeBlock
            title="Cargo.toml"
            code={`[dependencies]
gpui-ce = { git = "https://github.com/Far-Beyond-Pulsar/WGPUI" }`}
          />

          <CodeBlock
            title="src/main.rs — Hello World"
            code={`use gpui::*;

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
}`}
          />

          <CodeBlock
            title="Build & Run"
            code={`cargo run
# Compiles on Windows, macOS, Linux, and WASM`}
          />
        </div>
      </section>

      <div className="divider mx-auto max-w-4xl" />

      {/* ─── Features ─── */}
      <section id="features" className="py-24 px-5">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <p className="flex items-center justify-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white/40 mb-4">
              <span className="w-8 h-px bg-[#38bdf8]/70" />
              03 / Features
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              Why <span className="text-[#38bdf8]">WGPUI</span>?
            </h2>
            <p className="text-white/40 max-w-xl mx-auto text-sm">
              Replace platform-specific UI code with a single, unified GPU-accelerated framework.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.07 }}
                className="group border-l-2 border-white/[0.08] bg-white/[0.02] pl-5 pr-4 py-5 hover:bg-white/[0.05] hover:border-[#38bdf8]/40 transition-all"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/25 mb-3">
                  <span className="text-[#38bdf8]/60">0{i + 1}</span>
                </p>
                <feat.icon className="w-5 h-5 text-[#0ea5e9] mb-3" />
                <h3 className="text-sm font-semibold text-white mb-2">{feat.title}</h3>
                <p className="text-xs text-white/45 leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider mx-auto max-w-4xl" />

      {/* ─── Component Library ─── */}
      <section id="components" className="py-24 px-5">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <p className="flex items-center justify-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white/40 mb-4">
              <span className="w-8 h-px bg-[#38bdf8]/70" />
              04 / Component Library
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              <span className="text-[#38bdf8]">WGPUI-Component</span>
            </h2>
            <p className="text-white/40 max-w-xl mx-auto text-sm">
              A comprehensive suite of reusable UI primitives built on WGPUI.
            </p>
          </motion.div>

          <div className="text-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-2 text-xs text-white/40">
              <span className="px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] border border-white/[0.07] bg-white/[0.03]">Buttons</span>
              <span className="px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] border border-white/[0.07] bg-white/[0.03]">Menus</span>
              <span className="px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] border border-white/[0.07] bg-white/[0.03]">Tabs</span>
              <span className="px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] border border-white/[0.07] bg-white/[0.03]">Dropdowns</span>
              <span className="px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] border border-white/[0.07] bg-white/[0.03]">Accordions</span>
              <span className="px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] border border-white/[0.07] bg-white/[0.03]">Modals</span>
              <span className="px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] border border-white/[0.07] bg-white/[0.03]">Popovers</span>
              <span className="px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] border border-white/[0.07] bg-white/[0.03]">Sliders</span>
              <span className="px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] border border-white/[0.07] bg-white/[0.03]">Switches</span>
              <span className="px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] border border-white/[0.07] bg-white/[0.03]">Progress Bars</span>
              <span className="px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] border border-white/[0.07] bg-white/[0.03]">Virtual Lists</span>
              <span className="px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] border border-white/[0.07] bg-white/[0.03]">Code Editor</span>
              <span className="px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] border border-white/[0.07] bg-white/[0.03]">Charts</span>
              <span className="px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] border border-white/[0.07] bg-white/[0.03]">Drag &amp; Drop</span>
              <span className="px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] border border-white/[0.07] bg-white/[0.03]">Resizable Panels</span>
              <span className="px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] border border-white/[0.07] bg-white/[0.03]">Tree Views</span>
              <span className="px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] border border-white/[0.07] bg-white/[0.03]">Tooltips</span>
              <span className="px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] border border-white/[0.07] bg-white/[0.03]">Breadcrumbs</span>
            </div>
          </div>
        </div>
      </section>

      <div className="divider mx-auto max-w-4xl" />

      {/* ─── CTA ─── */}
      <section className="py-28 px-5 relative overflow-hidden">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center select-none pointer-events-none opacity-40">
          <p className="text-outline text-[clamp(4rem,16vw,13rem)] font-bold tracking-[-0.04em] leading-none whitespace-nowrap" data-text="WGPUI">
            WGPUI
          </p>
        </div>
        <div className="relative max-w-2xl mx-auto text-center">
          <p className="flex items-center justify-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white/40 mb-4">
            <span className="w-8 h-px bg-[#38bdf8]/70" />
            05 / Get Started
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Ready to build?</h2>
          <p className="text-white/40 text-sm mb-8 max-w-md mx-auto">
            WGPUI is open source. Clone the repo, add the crate, and start building GPU-accelerated UIs.
          </p>
          <a
            href="https://github.com/Far-Beyond-Pulsar/WGPUI"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-mono text-[12px] uppercase tracking-[0.12em] rounded-md transition-colors"
          >
            <Github className="w-4 h-4" /> View on GitHub
          </a>
        </div>
      </section>
    </div>
  );
}
