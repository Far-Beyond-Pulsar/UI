//! Tabs & Workspace Demo
//! A complete workspace/dock demo with draggable panels.
//! Tags: workspace, dock, panels, tabs

use gpui::*;
use ui::dock::{DockPlacement, Panel, PanelEvent};
use ui::workspace::Workspace;

struct ExplorerPanel {
    focus: FocusHandle,
}

impl ExplorerPanel {
    fn new(cx: &mut Context<Self>) -> Self {
        Self {
            focus: cx.focus_handle(),
        }
    }
}

impl Panel for ExplorerPanel {
    fn panel_name(&self) -> &'static str {
        "Explorer"
    }

    fn title(&self, _window: &Window, _cx: &App) -> AnyElement {
        SharedString::from("Explorer").into_any_element()
    }

    fn closable(&self, _cx: &App) -> bool {
        false
    }
}

impl Focusable for ExplorerPanel {
    fn focus_handle(&self, _cx: &App) -> FocusHandle {
        self.focus.clone()
    }
}

impl EventEmitter<PanelEvent> for ExplorerPanel {}

impl Render for ExplorerPanel {
    fn render(&mut self, _window: &mut Window, cx: &mut Context<Self>) -> impl IntoElement {
        cx.notify();
        div()
            .flex_1()
            .p_4()
            .bg(rgb(0x1e1e1e))
            .child("Explorer Panel - Browse your files")
    }
}

struct OutlinePanel {
    focus: FocusHandle,
}

impl OutlinePanel {
    fn new(cx: &mut Context<Self>) -> Self {
        Self {
            focus: cx.focus_handle(),
        }
    }
}

impl Panel for OutlinePanel {
    fn panel_name(&self) -> &'static str {
        "Outline"
    }

    fn title(&self, _window: &Window, _cx: &App) -> AnyElement {
        SharedString::from("Outline").into_any_element()
    }

    fn closable(&self, _cx: &App) -> bool {
        false
    }
}

impl Focusable for OutlinePanel {
    fn focus_handle(&self, _cx: &App) -> FocusHandle {
        self.focus.clone()
    }
}

impl EventEmitter<PanelEvent> for OutlinePanel {}

impl Render for OutlinePanel {
    fn render(&mut self, _window: &mut Window, cx: &mut Context<Self>) -> impl IntoElement {
        cx.notify();
        div()
            .flex_1()
            .p_4()
            .bg(rgb(0x1e1e1e))
            .child("Outline Panel - Document structure")
    }
}

struct EditorPanel {
    focus: FocusHandle,
}

impl EditorPanel {
    fn new(cx: &mut Context<Self>) -> Self {
        Self {
            focus: cx.focus_handle(),
        }
    }
}

impl Panel for EditorPanel {
    fn panel_name(&self) -> &'static str {
        "Editor"
    }

    fn title(&self, _window: &Window, _cx: &App) -> AnyElement {
        SharedString::from("Editor").into_any_element()
    }
}

impl Focusable for EditorPanel {
    fn focus_handle(&self, _cx: &App) -> FocusHandle {
        self.focus.clone()
    }
}

impl EventEmitter<PanelEvent> for EditorPanel {}

impl Render for EditorPanel {
    fn render(&mut self, _window: &mut Window, cx: &mut Context<Self>) -> impl IntoElement {
        cx.notify();
        div()
            .flex_1()
            .p_4()
            .bg(rgb(0x252525))
            .child("Editor Panel - Main editing area (drag tabs to rearrange)")
    }
}

struct LogPanel {
    focus: FocusHandle,
}

impl LogPanel {
    fn new(cx: &mut Context<Self>) -> Self {
        Self {
            focus: cx.focus_handle(),
        }
    }
}

impl Panel for LogPanel {
    fn panel_name(&self) -> &'static str {
        "Log"
    }

    fn title(&self, _window: &Window, _cx: &App) -> AnyElement {
        SharedString::from("Log").into_any_element()
    }
}

impl Focusable for LogPanel {
    fn focus_handle(&self, _cx: &App) -> FocusHandle {
        self.focus.clone()
    }
}

impl EventEmitter<PanelEvent> for LogPanel {}

impl Render for LogPanel {
    fn render(&mut self, _window: &mut Window, cx: &mut Context<Self>) -> impl IntoElement {
        cx.notify();
        div()
            .flex_1()
            .p_4()
            .bg(rgb(0x1b1b1b))
            .child("Log Panel - Build output and diagnostics")
    }
}

struct WorkspaceDemo {
    workspace: Entity<Workspace>,
}

impl WorkspaceDemo {
    fn new(window: &mut Window, cx: &mut Context<Self>) -> Self {
        let workspace = cx.new(|cx| {
            let mut workspace = Workspace::new("demo-workspace", window, cx);

            workspace.add_panel(
                cx.new(|cx| ExplorerPanel::new(cx)),
                DockPlacement::Left,
                window,
                cx,
            );

            workspace.add_panel(
                cx.new(|cx| OutlinePanel::new(cx)),
                DockPlacement::Right,
                window,
                cx,
            );

            workspace.add_panel(
                cx.new(|cx| LogPanel::new(cx)),
                DockPlacement::Bottom,
                window,
                cx,
            );

            workspace
        });

        Self { workspace }
    }
}

impl Render for WorkspaceDemo {
    fn render(&mut self, _window: &mut Window, _cx: &mut Context<Self>) -> impl IntoElement {
        self.workspace.clone()
    }
}

fn main() {
    Application::new().run(|cx: &mut App| {
        cx.open_window(WindowOptions::default(), |window, cx| {
            cx.new(|cx| WorkspaceDemo::new(window, cx))
        })
        .unwrap();
    });
}
