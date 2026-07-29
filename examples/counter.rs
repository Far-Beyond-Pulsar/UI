use gpui::{div, prelude::*, px, rgb, size, App, Application, Bounds, Context, Window, WindowBounds, WindowOptions};
use wasm_bindgen::prelude::*;

struct Counter {
    count: i32,
}

impl gpui::Render for Counter {
    fn render(&mut self, _window: &mut Window, cx: &mut Context<Self>) -> impl gpui::IntoElement {
        cx.notify();
        div()
            .flex()
            .size_full()
            .justify_center()
            .items_center()
            .gap_4()
            .bg(rgb(0xf5f5f5))
            .child(
                div()
                    .flex()
                    .items_center()
                    .gap_4()
                    .child(
                        div()
                            .id("dec")
                            .px_4()
                            .py_2()
                            .rounded_lg()
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
                            .font_weight(gpui::FontWeight::BOLD)
                            .child(self.count.to_string())
                    )
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
                            .child("+")
                    )
            )
    }
}

#[wasm_bindgen(start)]
pub fn start() {
    console_error_panic_hook::set_once();
    Application::new().run(|cx: &mut App| {
        let bounds = Bounds::centered(None, size(px(800.), px(600.)), cx);
        cx.open_window(
            WindowOptions { window_bounds: Some(WindowBounds::Windowed(bounds)), ..Default::default() },
            |_, cx| cx.new(|_| Counter { count: 0 }),
        ).unwrap();
        cx.activate(true);
    });
}
