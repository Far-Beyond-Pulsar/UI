use gpui::{div, prelude::*, px, rgb, size, App, Application, Bounds, Context, SharedString, Window, WindowBounds, WindowOptions};
use wasm_bindgen::prelude::*;

struct TodoApp {
    count: u32,
}

impl gpui::Render for TodoApp {
    fn render(&mut self, _window: &mut Window, cx: &mut Context<Self>) -> impl gpui::IntoElement {
        cx.notify();
        let add = cx.listener(|this, _: &gpui::ClickEvent, _window, cx| {
            this.count += 1;
            cx.notify();
        });

        div()
            .flex()
            .flex_col()
            .size_full()
            .p_8()
            .gap_4()
            .bg(rgb(0xf5f5f5))
            .child(
                div()
                    .text_size(px(24.0))
                    .font_weight(gpui::FontWeight::BOLD)
                    .child("todos")
            )
            .child(
                div()
                    .id("add-btn")
                    .px_4()
                    .py_2()
                    .rounded_lg()
                    .bg(rgb(0x0ea5e9))
                    .on_click(add)
                    .child(format!("Add Task ({})", self.count))
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
            |_, cx| cx.new(|_| TodoApp { count: 0 }),
        ).unwrap();
        cx.activate(true);
    });
}
