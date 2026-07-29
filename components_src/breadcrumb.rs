//! Breadcrumb
//! Navigation breadcrumbs with clickable items. Uses ui::breadcrumb::{Breadcrumb, BreadcrumbItem}.
//! Tags: breadcrumb, navigation, path

use gpui::*;
use ui::breadcrumb::{Breadcrumb, BreadcrumbItem};

struct BreadcrumbDemo;

impl Render for BreadcrumbDemo {
    fn render(&mut self, _window: &mut Window, cx: &mut Context<Self>) -> impl IntoElement {
        cx.notify();
        ui::v_flex().size_full().justify_center().items_center().gap_4().bg(rgb(0x0c0c0c))
            .child(Breadcrumb::new()
                .item(BreadcrumbItem::new("home", "Home"))
                .item(BreadcrumbItem::new("docs", "Docs"))
                .item(BreadcrumbItem::new("guide", "Getting Started"))
            )
            .child(div().text_xs().text_color(rgb(0x555555)).child("Breadcrumb navigation trail"))
    }
}

fn main() {
    Application::new().run(|cx: &mut App| {
        cx.open_window(WindowOptions::default(), |_, cx| cx.new(|_| BreadcrumbDemo)).unwrap();
    });
}
