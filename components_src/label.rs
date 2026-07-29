//! Label
//! A text label with optional secondary text and highlights. Uses ui::label::Label.
//! Tags: label, text, typography

use gpui::*;
use ui::label::Label;

struct LabelDemo;

impl Render for LabelDemo {
    fn render(&mut self, _window: &mut Window, cx: &mut Context<Self>) -> impl IntoElement {
        cx.notify();
        ui::v_flex().size_full().justify_center().items_center().gap_4().bg(rgb(0x0c0c0c))
            .child(Label::new("Primary label"))
            .child(Label::new("With secondary").secondary("subtitle text"))
    }
}

fn main() {
    Application::new().run(|cx: &mut App| {
        cx.open_window(WindowOptions::default(), |_, cx| cx.new(|_| LabelDemo)).unwrap();
    });
}
