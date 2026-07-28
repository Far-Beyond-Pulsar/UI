//! Interactive counter with increment/decrement buttons.

use gpui::*;

struct Counter {
    count: i32,
}

impl Counter {
    fn increment(&mut self, _: &ClickEvent, _window: &mut Window, cx: &mut Context<Self>) {
        self.count += 1;
        cx.notify();
    }

    fn decrement(&mut self, _: &ClickEvent, _window: &mut Window, cx: &mut Context<Self>) {
        self.count -= 1;
        cx.notify();
    }
}

impl Render for Counter {
    fn render(&mut self, _window: &mut Window, cx: &mut Context<Self>) -> impl IntoElement {
        div()
            .flex()
            .size_full()
            .justify_center()
            .items_center()
            .gap_4()
            .bg(rgb(0x0c0c0c))
            .child(
                div()
                    .flex()
                    .items_center()
                    .gap_4()
                    .child(
                        div()
                            .px_4()
                            .py_2()
                            .rounded_lg()
                            .bg(rgb(0x333333))
                            .hover(|s| s.bg(rgb(0x444444)))
                            .on_click(cx.listener(Self::decrement))
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
                            .px_4()
                            .py_2()
                            .rounded_lg()
                            .bg(rgb(0x0ea5e9))
                            .hover(|s| s.bg(rgb(0x0284c7)))
                            .on_click(cx.listener(Self::increment))
                            .child("+")
                    )
            )
    }
}

fn main() {
    Application::new().run(|cx: &mut App| {
        cx.open_window(WindowOptions::default(), |_, cx| {
            cx.new(|_| Counter { count: 0 })
        })
        .expect("Failed to open window");
    });
}
