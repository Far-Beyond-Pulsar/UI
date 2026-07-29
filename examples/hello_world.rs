use gpui::*;

// A minimal GPUI application.
// Opens a window with a styled "Hello, WGPUI!" message.

struct HelloApp;

impl Render for HelloApp {
    fn render(&mut self, _window: &mut Window, cx: &mut Context<Self>) -> impl IntoElement {
        // Request a re-render every frame.
        // Required on WASM to keep the event loop running.
        cx.notify();

        div()
            .flex()
            .size_full()
            .justify_center()
            .items_center()
            .bg(rgb(0x0c0c0c))
            .text_color(rgb(0xffffff))
            .child(
                div()
                    .px_6()
                    .py_3()
                    .rounded_xl()
                    .bg(rgb(0x0ea5e9))
                    .child("Hello, WGPUI!"),
            )
    }
}

fn main() {
    Application::new().run(|cx: &mut App| {
        cx.open_window(WindowOptions::default(), |_, cx| {
            cx.new(|_| HelloApp)
        })
        .unwrap();
    });
}
