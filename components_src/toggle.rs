//! Toggle & ToggleGroup
//! Interactive toggle buttons for selection. Uses ui::button::{Toggle, ToggleGroup}.
//! Tags: toggle, button, selection

use gpui::*;
use ui::button::{Toggle, ToggleGroup};

struct ToggleDemo;

impl Render for ToggleDemo {
    fn render(&mut self, _window: &mut Window, cx: &mut Context<Self>) -> impl IntoElement {
        cx.notify();
        ui::v_flex().size_full().justify_center().items_center().gap_4().bg(rgb(0x0c0c0c))
            .child(div().text_sm().text_color(rgb(0xaaaaaa)).child("Choose a size:"))
            .child(ToggleGroup::new("size")
                .child(Toggle::label("Small"))
                .child(Toggle::label("Medium"))
                .child(Toggle::label("Large"))
            )
    }
}

fn main() {
    Application::new().run(|cx: &mut App| {
        cx.open_window(WindowOptions::default(), |_, cx| cx.new(|_| ToggleDemo)).unwrap();
    });
}
