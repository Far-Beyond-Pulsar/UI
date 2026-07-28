"use client";

import { motion } from "framer-motion";
import { CodeBlock } from "@/components/ui/CodeBlock";

const API_ITEMS = [
  {
    name: "App",
    desc: "The main application entry point. Initializes the wgpu device, event loop, and windowing system.",
    signature: "App::new() -> App",
    code: `use wgpui::*;

fn main() {
    App::new().run(|cx: &mut AppContext| {
        // Initialize windows, models, and subscriptions here
    });
}`,
  },
  {
    name: "AppContext",
    desc: "Provides access to window creation, global state, and application-level operations.",
    signature: "AppContext",
    code: `// Open a new window
cx.open_window(WindowOptions {
    title: "My App".into(),
    size: Some(px(1280.), px(720.)),
    ..Default::default()
}, |cx| {
    cx.new_view(|_cx| MyView)
});

// Spawn a background task
cx.spawn(|mut cx| async move {
    // Async work here
    cx.update(|cx| { /* update on main thread */ })
});`,
  },
  {
    name: "ViewContext",
    desc: "Context available inside a View's methods. Used for notifications, listeners, and child views.",
    signature: "ViewContext<'a, T>",
    code: `impl Render for MyView {
    fn render(&mut self, cx: &mut ViewContext<Self>) -> impl IntoElement {
        button()
            .on_click(cx.listener(|this, _event, cx| {
                // 'this' is &mut Self
                this.count += 1;
                cx.notify(); // triggers re-render
            }))
            .child(self.count.to_string())
    }
}`,
  },
  {
    name: "Render",
    desc: "Trait that every view must implement. Returns the element tree to be rendered each frame.",
    signature: "trait Render { fn render(&mut self, cx: &mut ViewContext<Self>) -> impl IntoElement; }",
    code: `impl Render for MyView {
    fn render(&mut self, cx: &mut ViewContext<Self>) -> impl IntoElement {
        div()
            .size_full()
            .bg(rgb(0x0c0c0c))
            .child(
                div()
                    .flex()
                    .justify_center()
                    .items_center()
                    .size_full()
                    .child("Hello")
            )
    }
}`,
  },
  {
    name: "Element",
    desc: "The core building block. All UI is constructed by composing elements via the builder pattern.",
    signature: "trait Element: 'static",
    code: `// All built-in functions return impl IntoElement:
div() -> Div
span() -> Span
button() -> Button
text_input() -> TextInput

// Custom elements can implement Element directly:
struct MyElement;
impl Element for MyElement {
    fn layout(&mut self, cx: &mut LayoutContext) -> ElementLayout {
        // Compute layout
    }
    fn paint(&mut self, cx: &mut PaintContext) {
        // Paint with wgpu
    }
}`,
  },
  {
    name: "Model<T>",
    desc: "Shared state container. Models are reference-counted and can be cloned across threads.",
    signature: "struct Model<T>(Arc<Mutex<T>>)",
    code: `let shared: Model<AppState> = cx.new_model(|cx| AppState::new(cx));

// Read from anywhere
shared.update(cx, |state, cx| {
    state.counter += 1;
});

// Subscribe to changes
cx.subscribe(&shared, |this, event, cx| {
    // React to model changes
});`,
  },
  {
    name: "Subscription",
    desc: "Reactive connection between models and views. Automatically cleaned up when the view is dropped.",
    signature: "struct Subscription",
    code: `// Auto-subscribe: listen for events from another view
cx.subscribe(&other_view, |this, event, cx| {
    match event {
        MyEvent::DataLoaded(data) => {
            this.data = data.clone();
            cx.notify();
        }
        _ => {}
    }
});

// Manual subscription (drops when the returned handle is dropped)
let handle = cx.observe(&model, |this, model, cx| {
    this.sync_from(&model);
});`,
  },
  {
    name: "Styling",
    desc: "WGPUI uses a chainable style API. Every style method returns Self for fluent chaining.",
    signature: "Fluent builder pattern on all element types",
    code: `div()
    .flex()                    // display: flex
    .flex_col()                // flex-direction: column
    .size_full()               // width: 100%; height: 100%
    .gap_4()                   // gap: 16px
    .p_6()                     // padding: 24px
    .rounded_xl()              // border-radius: 12px
    .bg(rgb(0x0c0c0c))        // background-color
    .text_color(rgb(0xffffff)) // color
    .border_1()                // border-width: 1px
    .border_color(rgba(255, 255, 255, 0.07))
    .hover(|s| s.bg(rgb(0x1a1a1a)))  // hover state`,
  },
  {
    name: "Events",
    desc: "Event system for user input. Events bubble up the element tree.",
    signature: "MouseEvent, ClickEvent, KeyEvent, etc.",
    code: `button()
    .on_click(cx.listener(|this, event: &ClickEvent, cx| {
        // event.modifiers, event.position, etc.
    }))
    .on_hover(cx.listener(|this, event: &HoverEvent, cx| {
        // event.hovered: bool
    }))
    .on_key_down(cx.listener(|this, event: &KeyEvent, cx| {
        // event.key, event.modifiers
    }))

// Prevent event bubbling
div().on_click(cx.listener(|_, _, cx| {
    cx.stop_propagation();
}))`,
  },
];

export default function ApiPage() {
  return (
    <div className="bg-black text-white">
      <div className="max-w-4xl mx-auto px-5 pb-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16 pt-14">
          <h1 className="text-4xl font-bold tracking-tight mb-2">API Reference</h1>
          <p className="text-sm text-white/40">
            Core types and traits in the WGPUI framework.
          </p>
        </motion.div>

        {API_ITEMS.map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="mb-12"
          >
            <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] overflow-hidden">
              <div className="px-5 pt-5 pb-3 border-b border-white/[0.06]">
                <div className="flex items-start justify-between mb-1">
                  <h2 className="text-lg font-semibold text-white font-mono">{item.name}</h2>
                </div>
                <p className="text-xs text-white/40">{item.desc}</p>
                {item.signature && (
                  <div className="mt-2 text-xs text-white/30 font-mono bg-white/[0.03] px-3 py-1.5 rounded">
                    {item.signature}
                  </div>
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
