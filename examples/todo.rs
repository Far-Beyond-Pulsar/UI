use gpui::*;

// A minimal todo-style counter with an Add Task button.
//
// In a full todo app, you would store a Vec<TodoItem> and
// render each item via .children(vec.iter().map(...)).
// See the counter example for click listener patterns.

struct TodoApp {
    count: u32,
}

impl Render for TodoApp {
    fn render(&mut self, _window: &mut Window, cx: &mut Context<Self>) -> impl IntoElement {
        cx.notify();

        div()
            .flex()
            .flex_col()
            .size_full()
            .p_8()
            .gap_4()
            .bg(rgb(0x0c0c0c))
            .text_color(rgb(0xffffff))
            // Header
            .child(
                div()
                    .text_size(px(24.0))
                    .font_weight(FontWeight::BOLD)
                    .child("todos"),
            )
            // Add button with counter
            .child(
                div()
                    .id("add-btn")
                    .px_4()
                    .py_2()
                    .rounded_lg()
                    .bg(rgb(0x0ea5e9))
                    .on_click(cx.listener(|this, _event, _window, cx| {
                        this.count += 1;
                        cx.notify();
                    }))
                    .child(format!("Add Task ({})", self.count)),
            )
    }
}

fn main() {
    Application::new().run(|cx: &mut App| {
        cx.open_window(WindowOptions::default(), |_, cx| {
            cx.new(|_| TodoApp { count: 0 })
        })
        .unwrap();
    });
}
