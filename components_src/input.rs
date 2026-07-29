//! Input / Form
//! Form controls: checkbox, switch, radio. Uses ui primitives.
//! Tags: input, form, controls

use gpui::*;
use ui::checkbox::Checkbox;
use ui::radio::{RadioGroup, Radio};
use ui::switch::Switch;

struct InputDemo;

impl Render for InputDemo {
    fn render(&mut self, _window: &mut Window, cx: &mut Context<Self>) -> impl IntoElement {
        cx.notify();
        ui::v_flex().size_full().justify_center().items_center().gap_4().bg(rgb(0x0c0c0c))
            .child(Checkbox::new("c1").label("Enable notifications").checked(true))
            .child(Switch::new("s1").label("Dark mode").checked(true))
            .child(RadioGroup::vertical("rg")
                .child(Radio::new("r1").label("Option A"))
                .child(Radio::new("r2").label("Option B").checked(true))
            )
    }
}

fn main() {
    Application::new().run(|cx: &mut App| {
        cx.open_window(WindowOptions::default(), |_, cx| cx.new(|_| InputDemo)).unwrap();
    });
}
