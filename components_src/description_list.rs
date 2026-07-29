//! DescriptionList
//! Key-value data display with label and value pairs. Uses ui::description_list::{DescriptionList, DescriptionItem}.
//! Tags: description, list, data, key-value

use gpui::*;
use ui::description_list::DescriptionList;

struct DescriptionListDemo;

impl Render for DescriptionListDemo {
    fn render(&mut self, _window: &mut Window, cx: &mut Context<Self>) -> impl IntoElement {
        cx.notify();
        ui::v_flex().size_full().justify_center().items_center().bg(rgb(0x0c0c0c)).px_8()
            .child(DescriptionList::new().bordered(true)
                .child("Name", "John Doe", 1)
                .child("Role", "Developer", 1)
                .child("Email", "john@example.com", 1)
            )
    }
}

fn main() {
    Application::new().run(|cx: &mut App| {
        cx.open_window(WindowOptions::default(), |_, cx| cx.new(|_| DescriptionListDemo)).unwrap();
    });
}
