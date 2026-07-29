//! Tag
//! Coloured tags with variants: primary, secondary, success, danger, warning.
//! Tags: tag, label, status

use gpui::*;
use ui::tag::Tag;

struct TagDemo;

impl Render for TagDemo {
    fn render(&mut self, _window: &mut Window, cx: &mut Context<Self>) -> impl IntoElement {
        cx.notify();
        ui::v_flex().size_full().justify_center().items_center().gap_3().bg(rgb(0x0c0c0c))
            .child(Tag::primary().child("Primary"))
            .child(Tag::secondary().child("Secondary"))
            .child(Tag::success().child("Success"))
            .child(Tag::danger().child("Danger"))
            .child(Tag::warning().child("Warning"))
    }
}

fn main() {
    Application::new().run(|cx: &mut App| {
        cx.open_window(WindowOptions::default(), |_, cx| cx.new(|_| TagDemo)).unwrap();
    });
}
