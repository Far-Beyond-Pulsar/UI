//! GroupBox / Card
//! A titled container with fill variant. Uses ui::group_box::GroupBox.
//! Tags: card, layout, container

use gpui::*;
use ui::group_box::GroupBox;

struct CardDemo;

impl Render for CardDemo {
    fn render(&mut self, _window: &mut Window, cx: &mut Context<Self>) -> impl IntoElement {
        cx.notify();
        ui::v_flex().size_full().justify_center().items_center().bg(rgb(0x0c0c0c))
            .child(GroupBox::new().id("card").title("Card Title").fill().child(
                ui::v_flex().p_4().gap_2()
                    .child(div().text_sm().child("Card body content here."))
                    .child(div().text_xs().text_color(rgb(0x888888)).child("With a secondary description."))
            ))
    }
}

fn main() {
    Application::new().run(|cx: &mut App| {
        cx.open_window(WindowOptions::default(), |_, cx| cx.new(|_| CardDemo)).unwrap();
    });
}
