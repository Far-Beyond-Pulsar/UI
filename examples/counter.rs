use gpui::*;

// A stateful counter with increment and decrement buttons.
// Demonstrates:
//   - State management with a struct
//   - Click event listeners via cx.listener()
//   - Re-rendering on state change via cx.notify()
//   - Hover styles via .hover()
//   - Element IDs (required for on_click to work)

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
                div()
                    .flex()
                    .items_center()
                    .gap_4()
                    // Decrement button
                    .child(
                        div()
                            .id("dec")  // ID is required for on_click
                            .px_4()
                            .py_2()
                            .rounded_lg()
                            .bg(rgb(0x333333))
                            .hover(|s| s.bg(rgb(0x444444)))
                            .on_click(cx.listener(|this, _event, _window, cx| {
                                this.count -= 1;
                                cx.notify();  // schedule re-render
                            }))
                            .child("-"),
                    )
                    // Current count display
                    .child(
                        div()
                            .text_size(px(32.0))
                            .font_weight(FontWeight::BOLD)
                            .child(self.count.to_string()),
                    )
                    // Increment button
                    .child(
                        div()
                            .id("inc")
                            .px_4()
                            .py_2()
                            .rounded_lg()
                            .bg(rgb(0x0ea5e9))
                            .hover(|s| s.bg(rgb(0x0284c7)))
                            .on_click(cx.listener(|this, _event, _window, cx| {
                                this.count += 1;
                                cx.notify();
                            }))
                            .child("+"),
                    ),
            )
    }
}

fn main() {
    Application::new().run(|cx: &mut App| {
        cx.open_window(WindowOptions::default(), |_, cx| {
            cx.new(|_| Counter { count: 0 })
        })
        .unwrap();
    });
}
