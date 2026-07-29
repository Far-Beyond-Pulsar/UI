//! Badge
//! A count badge with dot and icon variants. Uses ui::badge::Badge.
//! Tags: badge, indicator, count

use gpui::*;
use ui::badge::Badge;

struct BadgeDemo;

impl Render for BadgeDemo {
    fn render(&mut self, _window: &mut Window, cx: &mut Context<Self>) -> impl IntoElement {
        cx.notify();
        ui::v_flex().size_full().justify_center().items_center().gap_4().bg(rgb(0x0c0c0c))
            .child(div().child("Inbox ").child(Badge::new().count(5)))
            .child(div().child("Updates ").child(Badge::new().dot()))
    }
}

fn main() {
    Application::new().run(|cx: &mut App| {
        cx.open_window(WindowOptions::default(), |_, cx| cx.new(|_| BadgeDemo)).unwrap();
    });
}
