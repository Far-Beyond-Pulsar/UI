//! Spinner
//! Loading spinner with size and color variants. Uses ui::spinner::Spinner.
//! Tags: spinner, loading, progress

use gpui::*;
use ui::spinner::Spinner;
use ui::Sizable;

struct SpinnerDemo;

impl Render for SpinnerDemo {
    fn render(&mut self, _window: &mut Window, cx: &mut Context<Self>) -> impl IntoElement {
        cx.notify();
        ui::v_flex().size_full().justify_center().items_center().gap_4().bg(rgb(0x0c0c0c))
            .child(div().text_sm().child("Loading..."))
            .child(Spinner::new().large())
    }
}

fn main() {
    Application::new().run(|cx: &mut App| {
        cx.open_window(WindowOptions::default(), |_, cx| cx.new(|_| SpinnerDemo)).unwrap();
    });
}
