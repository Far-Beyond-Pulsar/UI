//! Skeleton
//! Placeholder loading skeletons with primary and secondary variants. Uses ui::skeleton::Skeleton.
//! Tags: skeleton, loading, placeholder

use gpui::*;
use ui::skeleton::Skeleton;

struct SkeletonDemo;

impl Render for SkeletonDemo {
    fn render(&mut self, _window: &mut Window, cx: &mut Context<Self>) -> impl IntoElement {
        cx.notify();
        ui::v_flex().size_full().justify_center().items_center().gap_3().bg(rgb(0x0c0c0c)).px_8()
            .child(Skeleton::new().w_full().h_4().rounded_md())
            .child(Skeleton::new().w_48().h_3().rounded_md())
            .child(Skeleton::new().secondary(true).w_full().h_16().rounded_md())
    }
}

fn main() {
    Application::new().run(|cx: &mut App| {
        cx.open_window(WindowOptions::default(), |_, cx| cx.new(|_| SkeletonDemo)).unwrap();
    });
}
