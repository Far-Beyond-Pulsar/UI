//! Button
//! Primary, secondary, danger, ghost, and outline button variants.
//! Tags: button, interactive, click

use gpui::*;
use ui::button::{Button, ButtonVariants};

struct ButtonDemo;

impl Render for ButtonDemo {
    fn render(&mut self, _window: &mut Window, cx: &mut Context<Self>) -> impl IntoElement {
        cx.notify();
        let cb = |_: &ClickEvent, _: &mut Window, _: &mut App| {};
        ui::v_flex().size_full().justify_center().items_center().gap_4().bg(rgb(0x0c0c0c))
            .child(Button::new("p").primary().label("Primary").on_click(cb))
            .child(Button::new("s").label("Secondary").on_click(cb))
            .child(Button::new("d").danger().label("Danger").on_click(cb))
            .child(Button::new("o").outline().label("Outline").on_click(cb))
            .child(Button::new("g").ghost().label("Ghost").on_click(cb))
    }
}

fn main() {
    Application::new().run(|cx: &mut App| {
        cx.open_window(WindowOptions::default(), |_, cx| cx.new(|_| ButtonDemo)).unwrap();
    });
}
