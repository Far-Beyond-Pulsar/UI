//! A minimal WGPUI application. Opens a window with a styled button.

use gpui::*;

struct HelloApp;

impl Render for HelloApp {
    fn render(&mut self, _window: &mut Window, _cx: &mut Context<Self>) -> impl IntoElement {
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
        })
        .expect("Failed to open window");
    });
}
