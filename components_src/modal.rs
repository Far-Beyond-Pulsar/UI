//! Alert / Notification
//! Alert banners with different severity levels. Uses ui::alert::Alert.
//! Tags: alert, notification, banner

use gpui::*;
use ui::alert::Alert;

struct ModalDemo;

impl Render for ModalDemo {
    fn render(&mut self, _window: &mut Window, cx: &mut Context<Self>) -> impl IntoElement {
        cx.notify();
        ui::v_flex().size_full().justify_center().items_center().gap_4().bg(rgb(0x0c0c0c)).px_8()
            .child(Alert::info("i", "This is an informational alert.").title("Info").banner())
            .child(Alert::success("s", "Operation completed successfully.").title("Success").banner())
            .child(Alert::warning("w", "Please review your settings.").title("Warning").banner())
            .child(Alert::error("e", "Something went wrong.").title("Error").banner())
    }
}

fn main() {
    Application::new().run(|cx: &mut App| {
        cx.open_window(WindowOptions::default(), |_, cx| cx.new(|_| ModalDemo)).unwrap();
    });
}
