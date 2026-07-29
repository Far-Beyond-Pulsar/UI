use gpui::{div, prelude::*, px, rgb, size, App, Application, Bounds, Context, Window, WindowBounds, WindowOptions};
use wasm_bindgen::prelude::*;

fn card(color: u32, label: &str) -> impl gpui::IntoElement {
    div()
        .id(format!("card-{}", label))
        .px_5()
        .py_3()
        .rounded_lg()
        .bg(rgb(color))
        .text_color(rgb(0xffffff))
        .child(label.to_string())
}

fn section(title: &str, content: impl gpui::IntoElement) -> impl gpui::IntoElement {
    div().flex().flex_col().gap_3()
        .child(div().text_sm().font_weight(gpui::FontWeight::BOLD).text_color(rgb(0xaaaaaa)).child(title.to_string()))
        .child(content)
}

struct FlexLayoutDemo;

impl gpui::Render for FlexLayoutDemo {
    fn render(&mut self, _window: &mut Window, cx: &mut Context<Self>) -> impl gpui::IntoElement {
        cx.notify();
        div()
            .id("root")
            .flex()
            .flex_col()
            .size_full()
            .bg(rgb(0x0c0c0c))
            .text_color(rgb(0xffffff))
            .child(
                // Scrollable content area
                div()
                    .id("scroll-area")
                    .flex_1()
                    .overflow_y_scroll()
                    .p_8()
                    .gap_8()
                    .flex()
                    .flex_col()
                    .child(section("Flex Row",
                        div().id("row-section").flex().flex_row().gap_3()
                            .child(card(0x0ea5e9, "One"))
                            .child(card(0x10b981, "Two"))
                            .child(card(0xf59e0b, "Three"))
                    ))
                    .child(section("Flex Column",
                        div().id("col-section").flex().flex_col().gap_2()
                            .child(card(0x8b5cf6, "Top"))
                            .child(card(0xec4899, "Middle"))
                            .child(card(0xef4444, "Bottom"))
                    ))
                    .child(section("Space Between",
                        div().id("between-section").flex().flex_row().justify_between()
                            .child(card(0x0ea5e9, "Left"))
                            .child(card(0x10b981, "Center"))
                            .child(card(0xf59e0b, "Right"))
                    ))
                    .child(section("Nested Layout",
                        div().id("nested-section").flex().flex_row().gap_4()
                            .child(div().id("sidebar").flex().flex_col().gap_2().flex_1()
                                .child(card(0x8b5cf6, "Sidebar"))
                                .child(card(0x7c3aed, "Nav"))
                            )
                            .child(div().id("main").flex().flex_col().gap_2().flex_1()
                                .child(card(0x0ea5e9, "Main"))
                                .child(div().id("cards").flex().flex_row().gap_2()
                                    .child(card(0x10b981, "A"))
                                    .child(card(0xf59e0b, "B"))
                                )
                            )
                    ))
                    .child(section("Centered",
                        div().id("centered").flex().justify_center().items_center().h(px(96.0)).bg(rgb(0x1a1a1a)).rounded_lg()
                            .child("Perfectly Centered")
                    ))
                    .child(section("Tall Content (scroll test)",
                        div().id("tall").flex().flex_col().gap_2()
                            .child(card(0x333333, "Item 1"))
                            .child(card(0x444444, "Item 2"))
                            .child(card(0x555555, "Item 3"))
                            .child(card(0x666666, "Item 4"))
                            .child(card(0x777777, "Item 5"))
                            .child(card(0x888888, "Item 6"))
                            .child(card(0x999999, "Item 7"))
                            .child(card(0xaaaaaa, "Item 8"))
                    ))
            )
    }
}

#[wasm_bindgen(start)]
pub fn start() {
    console_error_panic_hook::set_once();
    Application::new().run(|cx: &mut App| {
        let bounds = Bounds::centered(None, size(px(800.), px(600.)), cx);
        cx.open_window(
            WindowOptions { window_bounds: Some(WindowBounds::Windowed(bounds)), ..Default::default() },
            |_, cx| cx.new(|_| FlexLayoutDemo),
        ).unwrap();
        cx.activate(true);
    });
}
