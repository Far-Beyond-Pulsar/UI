"use client";

import { motion } from "framer-motion";
import { CodeBlock } from "@/components/ui/CodeBlock";

const COMPONENTS = [
  {
    category: "Core Elements",
    items: [
      {
        name: "div()",
        desc: "The fundamental building block. All UI elements are divs with style modifiers. Text is added via .child().",
        code: `use gpui::*;

div()
    .flex()
    .flex_col()
    .size_full()
    .p_4()
    .gap_2()
    .bg(rgb(0x0c0c0c))
    .text_color(rgb(0xffffff))
    .child("Hello")
    .child(
        div()
            .id("child-el")
            .px_3()
            .py_2()
            .rounded_lg()
            .bg(rgb(0x0ea5e9))
            .on_click(cx.listener(|this, _event, _window, cx| {
                cx.notify();
            }))
            .child("Click me")
    )`,
      },
      {
        name: "Text",
        desc: "Text is rendered by passing a string to .child(). There is no span() or p() element.",
        code: `use gpui::*;

div()
    .child("Plain text")
    .child(
        div()
            .text_size(px(24.0))
            .font_weight(FontWeight::BOLD)
            .text_color(rgb(0x0ea5e9))
            .child("Styled text")
    )
    .child(
        div()
            .text_xs()
            .text_color(rgb(0x888888))
            .child(format!("Dynamic: {}", count))
    )`,
      },
    ],
  },
  {
    category: "Interactivity",
    items: [
      {
        name: "Click & Hover",
        desc: "Interactive elements need .id() for click events to work. Hover uses the .hover() style modifier.",
        code: `use gpui::*;

div()
    .id("btn")
    .px_4()
    .py_2()
    .rounded_lg()
    .bg(rgb(0x0ea5e9))
    .hover(|s| s.bg(rgb(0x0284c7)))
    .on_click(cx.listener(|this, _event, _window, cx| {
        // 4 listener args: (this, event, window, cx)
        this.count += 1;
        cx.notify();
    }))
    .child("Click me")`,
      },
      {
        name: "Mouse Events",
        desc: "Low-level mouse events: on_mouse_down, on_mouse_up, on_mouse_move.",
        code: `use gpui::*;

div()
    .id("mouse-area")
    .w(px(200.0))
    .h(px(100.0))
    .bg(rgb(0x333333))
    .on_mouse_down(MouseButton::Left, cx.listener(|this, _event, _window, cx| {
        this.pressed = true;
        cx.notify();
    }))
    .on_mouse_up(MouseButton::Left, cx.listener(|this, _event, _window, cx| {
        this.pressed = false;
        cx.notify();
    }))`,
      },
    ],
  },
  {
    category: "Layout",
    items: [
      {
        name: "Flex",
        desc: "GPUI uses flexbox via style shortcuts. flex_1() sets flex-grow:1. overflow_y_scroll() enables scrolling.",
        code: `use gpui::*;

div()
    .flex()
    .flex_col()
    .size_full()
    // Scrollable area
    .child(
        div()
            .id("scroll")
            .flex_1()
            .overflow_y_scroll()
            .gap_2()
            .children((0..20).map(|i| {
                div().p_2().bg(rgb(0x1a1a1a)).child(format!("Item {i}"))
            }))
    )
    // Fixed bottom bar
    .child(
        div()
            .h(px(48.0))
            .bg(rgb(0x0ea5e9))
            .child("Footer")
    )`,
      },
      {
        name: "Positioning",
        desc: "Elements can be positioned with .absolute(), .relative(), .top(), .left(), etc.",
        code: `use gpui::*;

div()
    .relative()
    .size_full()
    .child(
        div()
            .absolute()
            .top(px(16.0))
            .right(px(16.0))
            .bg(rgb(0xe94560))
            .size_12()
            .rounded_full()
    )
    .child(
        div()
            .absolute()
            .bottom(px(16.0))
            .left(px(16.0))
            .child("Bottom left")
    )`,
      },
    ],
  },
  {
    category: "Common Patterns",
    items: [
      {
        name: "Conditional Rendering",
        desc: "Use .when() and .when_some() for conditional children.",
        code: `use gpui::*;

div()
    .when(is_loading, |el| el.child("Loading..."))
    .when(error.is_some(), |el| el.child("Error!"))
    .when_some(optional_value.as_ref(), |el, val| {
        el.child(format!("Value: {val}"))
    })
    .children(items.iter().map(|item| {
        div().child(item.label.clone())
    }))`,
      },
      {
        name: "cx.notify() pattern",
        desc: "On WASM, call cx.notify() at the start of render() to keep the frame loop running.",
        code: `use gpui::*;

impl Render for MyView {
    fn render(&mut self, _window: &mut Window, cx: &mut Context<Self>) -> impl IntoElement {
        cx.notify(); // required on WASM for continuous rendering
        div().size_full().child(self.text.clone())
    }
}`,
      },
    ],
  },
];

export default function ComponentsPage() {
  return (
    <div className="bg-black text-white">
      <div className="max-w-4xl mx-auto px-5 pb-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16 pt-12">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Components</h1>
          <p className="text-sm text-white/40">
            GPUI patterns and primitives. Note: there is no <code className="text-[#0ea5e9]">button()</code>,
            <code className="text-[#0ea5e9]">span()</code>, or <code className="text-[#0ea5e9]">h1()</code> element function
            — everything is built with <code className="text-[#0ea5e9]">div()</code> and style modifiers.
            The <code className="text-[#0ea5e9]">ui</code> crate provides higher-level components (tabs, modals, sliders).
          </p>
        </motion.div>
        {COMPONENTS.map((group, i) => (
          <motion.div key={group.category} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="mb-16">
            <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <span className="w-1 h-4 rounded-full bg-[#0ea5e9]" />{group.category}
            </h2>
            <div className="space-y-8">
              {group.items.map((item) => (
                <div key={item.name} className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-5">
                  <div className="mb-3">
                    <h3 className="text-sm font-semibold text-white">{item.name}</h3>
                    <p className="text-xs text-white/40 mt-0.5">{item.desc}</p>
                  </div>
                  <CodeBlock code={item.code} />
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
