use gpui::*;

// Demonstrates runtime theme switching.
//
// Click the button to cycle through color palettes.
// Each palette changes the accent color and hover state.

struct Theme {
    name: &'static str,
    accent: u32,
    accent_hover: u32,
}

const THEMES: &[Theme] = &[
    Theme { name: "Pulsar Blue", accent: 0x0ea5e9, accent_hover: 0x0284c7 },
    Theme { name: "Emerald",    accent: 0x10b981, accent_hover: 0x059669 },
    Theme { name: "Ruby",       accent: 0xef4444, accent_hover: 0xdc2626 },
    Theme { name: "Amber",      accent: 0xf59e0b, accent_hover: 0xd97706 },
    Theme { name: "Violet",     accent: 0x8b5cf6, accent_hover: 0x7c3aed },
];

struct ThemeDemo {
    current: usize,
}

impl Render for ThemeDemo {
    fn render(&mut self, _window: &mut Window, cx: &mut Context<Self>) -> impl IntoElement {
        cx.notify();
        let t = &THEMES[self.current];

        div()
            .flex()
            .flex_col()
            .size_full()
            .justify_center()
            .items_center()
            .gap_6()
            .bg(rgb(0x0c0c0c))
            .text_color(rgb(0xffffff))
            // Theme name header
            .child(
                div()
                    .text_size(px(32.0))
                    .font_weight(FontWeight::BOLD)
                    .child(format!("Theme: {}", t.name)),
            )
            // Switch button (uses current accent color)
            .child(
                div()
                    .id("switch-btn")
                    .px_6()
                    .py_3()
                    .rounded_xl()
                    .bg(rgb(t.accent))
                    .hover(|s| s.bg(rgb(t.accent_hover)))
                    .on_click(cx.listener(|this, _event, _window, cx| {
                        this.current = (this.current + 1) % THEMES.len();
                        cx.notify();
                    }))
                    .child("Switch Theme"),
            )
            // Color dot indicators
            .child(
                div()
                    .flex()
                    .gap_2()
                    .children(THEMES.iter().enumerate().map(|(i, theme)| {
                        div()
                            .w_4()
                            .h_4()
                            .rounded_full()
                            .bg(rgb(theme.accent))
                            .border_2()
                            .border_color(rgb(if i == self.current {
                                0xffffff
                            } else {
                                0x000000
                            }))
                    })),
            )
    }
}

fn main() {
    Application::new().run(|cx: &mut App| {
        cx.open_window(WindowOptions::default(), |_, cx| {
            cx.new(|_| ThemeDemo { current: 0 })
        })
        .unwrap();
    });
}
