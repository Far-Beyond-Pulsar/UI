"use client";

import { motion } from "framer-motion";
import { CodeBlock } from "@/components/ui/CodeBlock";

const API_ITEMS = [
  {
    name: "Application",
    desc: "Entry point. Creates the platform, wgpu device, and event loop. Use Application::new().run().",
    signature: "Application::new().run(|cx: &mut App| { ... })",
    code: `use gpui::*;

fn main() {
    Application::new().run(|cx: &mut App| {
        cx.open_window(WindowOptions::default(), |_, cx| {
            cx.new(|_| MyView)
        }).unwrap();
    });
}`,
  },
  {
    name: "App",
    desc: "Application context passed to the run callback. Provides window creation, global state, and platform access.",
    signature: "App",
    code: `// Open a window (first arg is window options, second is a callback)
cx.open_window(WindowOptions::default(), |_, cx| {
    cx.new(|_| MyView)
});

// On WASM: activate to ensure events work
cx.activate(true);

// Spawn an async task
cx.spawn(|mut cx| async move {
    // Async work
    cx.update(|cx| { /* update on main thread */ }).ok();
});`,
  },
  {
    name: "Context<T>",
    desc: "Context available inside a view. Used for notifications, listeners, spawning child views.",
    signature: "Context<'a, T>",
    code: `impl Render for MyView {
    fn render(&mut self, _window: &mut Window, cx: &mut Context<Self>) -> impl IntoElement {
        cx.notify(); // schedule re-render (required on WASM)

        div()
            .id("btn")
            .on_click(cx.listener(|this, _event, _window, cx| {
                // this: &mut Self
                // cx: &mut Context<Self>
                this.count += 1;
                cx.notify();
            }))
            .child(self.count.to_string())
    }
}`,
  },
  {
    name: "Render",
    desc: "Trait that every view must implement. Returns the element tree. Takes &mut self, &mut Window, &mut Context<Self>.",
    signature: "trait Render { fn render(&mut self, window: &mut Window, cx: &mut Context<Self>) -> impl IntoElement; }",
    code: `use gpui::*;

struct MyView;

impl Render for MyView {
    fn render(&mut self, _window: &mut Window, cx: &mut Context<Self>) -> impl IntoElement {
        cx.notify();
        div()
            .size_full()
            .bg(rgb(0x0c0c0c))
            .child("Hello")
    }
}`,
  },
  {
    name: "Element",
    desc: "Building block. All UI is composed of elements via the builder pattern. Most UI uses div() with style modifiers.",
    signature: "trait Element: 'static",
    code: `// Main element functions:
div() -> Div       // The universal container

// No span(), h1(), button(), etc. — use div() with
// text_size(), font_weight(), .child("text") instead.

// Custom elements implement Element directly:
struct MyElement;
impl Element for MyElement {
    fn layout(&mut self, cx: &mut LayoutContext) -> ElementLayout { todo!() }
    fn paint(&mut self, cx: &mut PaintContext) { todo!() }
}`,
  },
  {
    name: "Styling",
    desc: "Chainable style methods on every element.",
    signature: "Style shortcuts on all element types",
    code: `use gpui::*;

div()
    .flex()                    // display: flex
    .flex_col()                // flex-direction: column
    .flex_1()                  // flex-grow: 1, flex-shrink: 1, flex-basis: 0
    .size_full()               // width: 100%, height: 100%
    .gap_4()                   // gap: 16px
    .p_6()                     // padding: 24px
    .px_3()                    // padding-left/right: 12px
    .py_2()                    // padding-top/bottom: 8px
    .w_full()                  // width: 100%
    .h(px(56.0))               // explicit height: 56px
    .rounded_xl()              // border-radius: 12px
    .border_1()                // border-width: 1px
    .bg(rgb(0x0c0c0c))        // background color
    .text_color(rgb(0xffffff)) // text color
    .text_size(px(24.0))       // font size
    .font_weight(FontWeight::BOLD)  // font weight
    .hover(|s| s.bg(rgb(0x333333))) // hover style
    .overflow_y_scroll()       // scrollable`,
  },
  {
    name: "Events",
    desc: "Event listeners need .id() on the element. Listeners receive 4 args: (this, event, window, cx).",
    signature: "cx.listener(|this: &mut Self, event: &ClickEvent, window: &mut Window, cx: &mut Context<Self>| { ... })",
    code: `use gpui::*;

div()
    .id("interactive")                    // REQUIRED for on_click
    .on_click(cx.listener(|this, _event: &ClickEvent, _window, cx| {
        this.clicked = true;
        cx.notify();
    }))
    .on_mouse_down(MouseButton::Left, cx.listener(|this, _event, _window, cx| {
        // MouseDownEvent
        cx.notify();
    }))
    .on_hover(cx.listener(|this, &hovered, _window, cx| {
        // hovered: bool (true on enter, false on leave)
        cx.notify();
    }))
    .child("Interact")

// Prevent event bubbling
div().id("inner")
    .on_click(cx.listener(|_, _, _, cx| {
        cx.stop_propagation();
    }))`,
  },
  {
    name: "WASM Entry Point",
    desc: "For WASM targets, use #[wasm_bindgen(start)] and console_error_panic_hook.",
    signature: "#[wasm_bindgen(start)] pub fn start()",
    code: `use gpui::*;
use wasm_bindgen::prelude::*;

#[wasm_bindgen(start)]
pub fn start() {
    console_error_panic_hook::set_once();
    Application::new().run(|cx: &mut App| {
        cx.activate(true); // required for WASM
        cx.open_window(WindowOptions::default(), |_, cx| {
            cx.new(|_| MyView)
        }).unwrap();
    });
}`,
  },
];

export default function ApiPage() {
  return (
    <div className="bg-black text-white">
      <div className="max-w-4xl mx-auto px-5 pb-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16 pt-12">
          <h1 className="text-4xl font-bold tracking-tight mb-2">API Reference</h1>
          <p className="text-sm text-white/40">
            Core types and patterns. The crate is used as <code className="text-[#0ea5e9]">gpui::*</code>.
          </p>
        </motion.div>
        {API_ITEMS.map((item, i) => (
          <motion.div key={item.name} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} className="mb-12">
            <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] overflow-hidden">
              <div className="px-5 pt-5 pb-3 border-b border-white/[0.06]">
                <div className="flex items-start justify-between mb-1">
                  <h2 className="text-lg font-semibold text-white font-mono">{item.name}</h2>
                </div>
                <p className="text-xs text-white/40">{item.desc}</p>
                {item.signature && (
                  <div className="mt-2 text-xs text-white/30 font-mono bg-white/[0.03] px-3 py-1.5 rounded">{item.signature}</div>
                )}
              </div>
              <CodeBlock code={item.code} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
