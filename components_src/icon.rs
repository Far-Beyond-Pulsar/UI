//! Icon
//! Vector icons with size and color variants. Uses ui::Icon and ui::IconName.
//! Tags: icon, vector, graphic

use gpui::*;
use ui::Icon;
use ui::IconName;

struct IconDemo;

impl Render for IconDemo {
    fn render(&mut self, _window: &mut Window, cx: &mut Context<Self>) -> impl IntoElement {
        cx.notify();
        ui::v_flex().size_full().justify_center().items_center().gap_4().bg(rgb(0x0c0c0c))
            .child(div().flex().gap_4().items_center()
                .child(Icon::new(IconName::Activity).w(px(24.)).h(px(24.)).text_color(rgb(0x0ea5e9)))
                .child(Icon::new(IconName::Airplay).w(px(24.)).h(px(24.)).text_color(rgb(0xffffff)))
                .child(Icon::new(IconName::Alarm).w(px(24.)).h(px(24.)).text_color(rgb(0xfbbf24)))
            )
    }
}

fn main() {
    Application::new().run(|cx: &mut App| {
        cx.open_window(WindowOptions::default(), |_, cx| cx.new(|_| IconDemo)).unwrap();
    });
}
