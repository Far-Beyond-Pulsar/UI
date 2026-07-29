//! Progress
//! A progress bar showing completion percentage. Uses ui::progress::Progress.
//! Tags: progress, loading, bar

use gpui::*;
use ui::progress::Progress;

struct ProgressDemo;

impl Render for ProgressDemo {
    fn render(&mut self, _window: &mut Window, cx: &mut Context<Self>) -> impl IntoElement {
        cx.notify();
        ui::v_flex().size_full().justify_center().items_center().gap_4().bg(rgb(0x0c0c0c)).px_8()
            .child(div().text_sm().child("Downloading..."))
            .child(Progress::new().value(65.))
            .child(div().text_xs().text_color(rgb(0x888888)).child("65% complete"))
    }
}

fn main() {
    Application::new().run(|cx: &mut App| {
        cx.open_window(WindowOptions::default(), |_, cx| cx.new(|_| ProgressDemo)).unwrap();
    });
}
