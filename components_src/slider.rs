//! Slider
//! A range slider with draggable thumb. Uses ui::Slider + SliderState.
//! Tags: slider, input, range

use gpui::*;
use ui::slider::{Slider, SliderState};

struct SliderDemo {
    state: Entity<SliderState>,
}

impl Render for SliderDemo {
    fn render(&mut self, _window: &mut Window, cx: &mut Context<Self>) -> impl IntoElement {
        cx.notify();
        ui::v_flex().size_full().justify_center().items_center().gap_6().bg(rgb(0x0c0c0c))
            .child(div().text_size(px(16.)).font_weight(FontWeight::BOLD).child("Volume"))
            .child(Slider::new(&self.state).horizontal())
    }
}

fn main() {
    Application::new().run(|cx: &mut App| {
        let state = cx.new(|_| SliderState::new().default_value(0.5).min(0.0).max(1.0));
        cx.open_window(WindowOptions::default(), |_, cx| cx.new(|_| SliderDemo { state })).unwrap();
    });
}

