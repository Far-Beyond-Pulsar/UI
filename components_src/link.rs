//! Link
//! Clickable link elements with optional href. Uses ui::link::Link.
//! Tags: link, hyperlink, navigation

use gpui::*;
use ui::link::Link;

struct LinkDemo;

impl Render for LinkDemo {
    fn render(&mut self, _window: &mut Window, cx: &mut Context<Self>) -> impl IntoElement {
        cx.notify();
        ui::v_flex().size_full().justify_center().items_center().gap_3().bg(rgb(0x0c0c0c))
            .child(Link::new("home").child("Home page"))
            .child(Link::new("docs").child("Documentation"))
            .child(Link::new("github").child("GitHub repository"))
            .child(div().text_xs().text_color(rgb(0x555555)).child("Clickable links with hover state"))
    }
}

fn main() {
    Application::new().run(|cx: &mut App| {
        cx.open_window(WindowOptions::default(), |_, cx| cx.new(|_| LinkDemo)).unwrap();
    });
}
