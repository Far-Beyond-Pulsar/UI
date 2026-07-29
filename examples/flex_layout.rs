use gpui::*;

// Demonstrates flexbox layout:
//   - Flex row vs column
//   - Gap, padding, alignment
//   - Scrollable overflow
//   - Nested layouts
//   - The scroll area uses overflow_y_scroll() and flex_1()
//     to fill remaining space and scroll when content overflows.

fn card(color: u32, label: &str) -> impl IntoElement {
    div()
        .px_5()
        .py_3()
        .rounded_lg()
        .bg(rgb(color))
        .text_color(rgb(0xffffff))
        .child(label.to_string())
}

fn section(title: &str, content: impl IntoElement) -> impl IntoElement {
    div()
        .flex()
        .flex_col()
        .gap_3()
        .child(
            div()
                .text_sm()
                .font_weight(FontWeight::BOLD)
                .text_color(rgb(0xaaaaaa))
                .child(title.to_string()),
        )
        .child(content)
}

struct FlexLayoutDemo;

impl Render for FlexLayoutDemo {
    fn render(&mut self, _window: &mut Window, cx: &mut Context<Self>) -> impl IntoElement {
        cx.notify();

        div()
            .id("root")
            .flex()
            .flex_col()
            .size_full()
            .bg(rgb(0x0c0c0c))
            .text_color(rgb(0xffffff))
            .child(
                // Scrollable content area.
                // flex_1() fills remaining vertical space.
                // overflow_y_scroll() enables vertical scrolling.
                div()
                    .id("scroll-area")
                    .flex_1()
                    .overflow_y_scroll()
                    .p_8()
                    .gap_8()
                    .flex()
                    .flex_col()
                    // Row layout: elements sit side by side
                    .child(section(
                        "Flex Row",
                        div()
                            .id("row")
                            .flex()
                            .flex_row()
                            .gap_3()
                            .child(card(0x0ea5e9, "One"))
                            .child(card(0x10b981, "Two"))
                            .child(card(0xf59e0b, "Three")),
                    ))
                    // Column layout: elements stack vertically
                    .child(section(
                        "Flex Column",
                        div()
                            .id("col")
                            .flex()
                            .flex_col()
                            .gap_2()
                            .child(card(0x8b5cf6, "Top"))
                            .child(card(0xec4899, "Middle"))
                            .child(card(0xef4444, "Bottom")),
                    ))
                    // Centered content
                    .child(section(
                        "Centered",
                        div()
                            .id("center")
                            .flex()
                            .justify_center()
                            .items_center()
                            .h(px(96.0))
                            .bg(rgb(0x1a1a1a))
                            .rounded_lg()
                            .child("Perfectly Centered"),
                    ))
                    // Tall content to demonstrate scrolling
                    .child(section(
                        "Tall Content",
                        div()
                            .id("tall")
                            .flex()
                            .flex_col()
                            .gap_2()
                            .children((1..=10).map(|i| {
                                card(0x333333 + i * 0x111111, &format!("Item {i}"))
                            })),
                    )),
            )
    }
}

fn main() {
    Application::new().run(|cx: &mut App| {
        cx.open_window(WindowOptions::default(), |_, cx| {
            cx.new(|_| FlexLayoutDemo)
        })
        .unwrap();
    });
}
