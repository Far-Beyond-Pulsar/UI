//! Kbd (Keyboard)
//! Keyboard shortcut labels. Uses ui::Kbd with Keystroke from gpui.
//! Tags: keyboard, shortcut, kbd

use gpui::*;
use ui::Kbd;

struct KbdDemo;

impl Render for KbdDemo {
    fn render(&mut self, _window: &mut Window, cx: &mut Context<Self>) -> impl IntoElement {
        cx.notify();
        ui::v_flex().size_full().justify_center().items_center().gap_3().bg(rgb(0x0c0c0c))
            .child(div().flex().items_center().gap_2()
                .child(div().text_sm().child("Save"))
                .child(div().px_2().py_1().rounded_md().bg(rgb(0x222)).text_xs().child("Ctrl+S"))
            )
            .child(div().flex().items_center().gap_2()
                .child(div().text_sm().child("Copy"))
                .child(div().px_2().py_1().rounded_md().bg(rgb(0x222)).text_xs().child("Ctrl+C"))
            )
            .child(div().flex().items_center().gap_2()
                .child(div().text_sm().child("Paste"))
                .child(div().px_2().py_1().rounded_md().bg(rgb(0x222)).text_xs().child("Ctrl+V"))
            )
    }
}

fn main() {
    Application::new().run(|cx: &mut App| {
        cx.open_window(WindowOptions::default(), |_, cx| cx.new(|_| KbdDemo)).unwrap();
    });
}
