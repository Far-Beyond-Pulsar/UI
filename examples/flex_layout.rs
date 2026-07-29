use gpui::{div, prelude::*, px, rgb, size, App, Application, Bounds, Context, Window, WindowBounds, WindowOptions};
use wasm_bindgen::prelude::*;

fn card(color: u32, label: &str) -> impl gpui::IntoElement {
    div()
        .px_5()
        .py_3()
        .rounded_lg()
        .bg(rgb(color))
        .child(label.to_string())
}

fn section(title: &str, content: impl gpui::IntoElement) -> impl gpui::IntoElement {
    div().flex().flex_col().gap_3()
        .child(div().text_sm().font_weight(gpui::FontWeight::BOLD).text_color(rgb(0x888888)).child(title.to_string()))
        .child(content)
}

struct FlexLayoutDemo;

impl gpui::Render for FlexLayoutDemo {
    fn render(&mut self, _window: &mut Window, cx: &mut Context<Self>) -> impl gpui::IntoElement {
        cx.notify();
        div()
            .flex()
            .flex_col()
            .size_full()
            .p_8()
            .gap_8()
            .bg(rgb(0xf5f5f5))
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
                    .child(div().flex().flex_col().gap_2().flex_1()
                        .child(card(0x8b5cf6, "Sidebar"))
                        .child(card(0x7c3aed, "Nav"))
                    )
                    .child(div().flex().flex_col().gap_2().flex_1()
                        .child(card(0x0ea5e9, "Main"))
                        .child(div().flex().flex_row().gap_2()
                            .child(card(0x10b981, "A"))
                            .child(card(0xf59e0b, "B"))
                        )
                    )
            ))
            .child(section("Centered",
                div().flex().justify_center().items_center().h(px(96.0)).bg(rgb(0xffffff)).rounded_lg()
                    .child("Perfectly Centered")
            ))
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
