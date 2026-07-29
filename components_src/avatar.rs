//! Avatar
//! User avatars with name initials and optional images. Uses ui::avatar::Avatar.
//! Tags: avatar, user, profile

use gpui::*;
use ui::avatar::Avatar;

struct AvatarDemo;

impl Render for AvatarDemo {
    fn render(&mut self, _window: &mut Window, cx: &mut Context<Self>) -> impl IntoElement {
        cx.notify();
        ui::v_flex().size_full().justify_center().items_center().gap_4().bg(rgb(0x0c0c0c))
            .child(div().flex().gap_3().items_center()
                .child(Avatar::new().name("Alice"))
                .child(Avatar::new().name("Bob"))
                .child(Avatar::new().name("Charlie"))
            )
            .child(div().text_xs().text_color(rgb(0x888888)).child("User avatars with initials"))
    }
}

fn main() {
    Application::new().run(|cx: &mut App| {
        cx.open_window(WindowOptions::default(), |_, cx| cx.new(|_| AvatarDemo)).unwrap();
    });
}
