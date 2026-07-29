use gpui::{div, prelude::*, px, rgb, size, App, Application, Bounds, Context, Window, WindowBounds, WindowOptions};
use wasm_bindgen::prelude::*;

struct HelloApp;

impl gpui::Render for HelloApp {
    fn render(&mut self, _window: &mut Window, cx: &mut Context<Self>) -> impl gpui::IntoElement {
        cx.notify();
        div()
            .flex()
            .size_full()
            .justify_center()
            .items_center()
            .bg(rgb(0x0c0c0c)).text_color(rgb(0xffffff))
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

#[wasm_bindgen(start)]
pub fn start() {
    console_error_panic_hook::set_once();
    Application::new().run(|cx: &mut App| {
        let bounds = Bounds::centered(None, size(px(800.), px(600.)), cx);
        cx.open_window(
            WindowOptions { window_bounds: Some(WindowBounds::Windowed(bounds)), ..Default::default() },
            |_, cx| cx.new(|_| HelloApp),
        ).unwrap();
        cx.activate(true);
    });
}
