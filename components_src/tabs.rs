//! Divider
//! Horizontal and vertical dividers with optional labels. Uses ui::divider::Divider.
//! Tags: divider, separator, layout

use gpui::*;
use ui::divider::Divider;

struct DividerDemo;

impl Render for DividerDemo {
    fn render(&mut self, _window: &mut Window, cx: &mut Context<Self>) -> impl IntoElement {
        cx.notify();
        ui::v_flex().size_full().justify_center().items_center().gap_4().bg(rgb(0x0c0c0c)).px_8()
            .child(div().text_sm().child("Section A"))
            .child(Divider::horizontal().label("divider"))
            .child(div().text_sm().child("Section B"))
            .child(Divider::horizontal())
            .child(div().text_sm().child("Section C"))
    }
}

fn main() {
    Application::new().run(|cx: &mut App| {
        cx.open_window(WindowOptions::default(), |_, cx| cx.new(|_| DividerDemo)).unwrap();
    });
}
