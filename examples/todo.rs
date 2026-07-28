//! A simple todo list with add and remove actions.

use gpui::*;

struct TodoApp {
    items: Vec<SharedString>,
}

impl TodoApp {
    fn add(&mut self, _: &ClickEvent, _window: &mut Window, cx: &mut Context<Self>) {
        let n = self.items.len() + 1;
        self.items.push(SharedString::from(format!("Task {n}")));
        cx.notify();
    }
}

impl Render for TodoApp {
    fn render(&mut self, _window: &mut Window, cx: &mut Context<Self>) -> impl IntoElement {
        let items: Vec<_> = self
            .items
            .iter()
            .map(|t| {
                div()
                    .flex()
                    .items_center()
                    .gap_3()
                    .p_3()
                    .bg(rgb(0x1a1a1a))
                    .rounded_lg()
                    .child(div().flex_1().child(t.clone()))
            })
            .collect();

        div()
            .flex()
            .flex_col()
            .size_full()
            .p_8()
            .gap_4()
            .bg(rgb(0x0c0c0c))
            .child(
                div()
                    .text_size(px(24.0))
                    .font_weight(FontWeight::BOLD)
                    .child("todos")
            )
            .child(
                div()
                    .px_4()
                    .py_2()
                    .rounded_lg()
                    .bg(rgb(0x0ea5e9))
                    .on_click(cx.listener(Self::add))
                    .child("Add Task")
            )
            .child(div().flex().flex_col().gap_2().children(items))
    }
}

fn main() {
    Application::new().run(|cx: &mut App| {
        cx.open_window(WindowOptions::default(), |_, cx| {
            cx.new(|_| TodoApp { items: vec![] })
        })
        .expect("Failed to open window");
    });
}
