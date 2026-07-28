//! Demonstrates WGPUI's flexbox layout system with nesting and alignment.

use gpui::*;

fn card(color: u32, label: &str) -> impl IntoElement {
    let label = label.to_string();
    div()
        .px_5()
        .py_3()
        .rounded_lg()
        .bg(rgb(color))
        .child(label)
}

fn section(title: &str, content: impl IntoElement) -> impl IntoElement {
    let title = title.to_string();
    div().flex().flex_col().gap_3()
        .child(
            div()
                .text_sm()
                .font_weight(FontWeight::BOLD)
                .text_color(rgb(0x888888))
                .child(title)
        )
        .child(content)
}

struct FlexLayoutDemo;

impl Render for FlexLayoutDemo {
    fn render(&mut self, _window: &mut Window, _cx: &mut Context<Self>) -> impl IntoElement {
        div()
            .flex()
            .flex_col()
            .size_full()
            .p_8()
            .gap_8()
            .bg(rgb(0x000000))
            .child(section("Flex Row",
                div().flex().flex_row().gap_3()
                    .child(card(0x0ea5e9, "One"))
                    .child(card(0x10b981, "Two"))
                    .child(card(0xf59e0b, "Three"))
            ))
            .child(section("Flex Column",
                div().flex().flex_col().gap_2()
                    .child(card(0x8b5cf6, "Top"))
                    .child(card(0xec4899, "Middle"))
                    .child(card(0xef4444, "Bottom"))
            ))
            .child(section("Space Between",
                div().flex().flex_row().justify_between()
                    .child(card(0x0ea5e9, "Left"))
                    .child(card(0x10b981, "Center"))
                    .child(card(0xf59e0b, "Right"))
            ))
            .child(section("Nested Layout",
                div().flex().flex_row().gap_4()
                    .child(
                        div().flex().flex_col().gap_2().flex_1()
                            .child(card(0x8b5cf6, "Sidebar"))
                            .child(card(0x7c3aed, "Nav"))
                            .child(card(0x6d28d9, "Nav"))
                    )
                    .child(
                        div().flex().flex_col().gap_2().flex_1()
                            .child(card(0x0ea5e9, "Main Content"))
                            .child(
                                div().flex().flex_row().gap_2()
                                    .child(card(0x10b981, "Card A"))
                                    .child(card(0xf59e0b, "Card B"))
                                    .child(card(0xec4899, "Card C"))
                            )
                    )
            ))
            .child(section("Centered Content",
                div()
                    .flex()
                    .justify_center()
                    .items_center()
                    .h(px(96.0))
                    .bg(rgb(0x1a1a1a))
                    .rounded_lg()
                    .child("Perfectly Centered")
            ))
    }
}

fn main() {
    Application::new().run(|cx: &mut App| {
        cx.open_window(WindowOptions::default(), |_, cx| {
            cx.new(|_| FlexLayoutDemo)
        })
        .expect("Failed to open window");
    });
}
