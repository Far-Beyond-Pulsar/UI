//! Tabs & Workspace
//! A proper workspace with dock panels using ui::Workspace and ui::dock primitives.
//! Panels are added after workspace creation via outer context to avoid entity conflicts.
//! Tags: workspace, dock, panels, tabs

use gpui::*;
use ui::dock::{DockPlacement, Panel, PanelEvent};
use ui::workspace::Workspace;

struct Explorer(FocusHandle);
impl Explorer {
    fn new(cx: &mut Context<Self>) -> Self { Self(cx.focus_handle()) }
}
impl Panel for Explorer {
    fn panel_name(&self) -> &'static str { "Explorer" }
    fn title(&self, _: &Window, _: &App) -> AnyElement { SharedString::from("Explorer").into_any_element() }
    fn closable(&self, _: &App) -> bool { false }
}
impl Focusable for Explorer { fn focus_handle(&self, _: &App) -> FocusHandle { self.0.clone() } }
impl EventEmitter<PanelEvent> for Explorer {}
impl Render for Explorer {
    fn render(&mut self, _: &mut Window, cx: &mut Context<Self>) -> impl IntoElement {
        cx.notify(); div().flex_1().p_4().bg(rgb(0x1e1e1e)).child("Explorer")
    }
}

struct Editor(FocusHandle);
impl Editor {
    fn new(cx: &mut Context<Self>) -> Self { Self(cx.focus_handle()) }
}
impl Panel for Editor {
    fn panel_name(&self) -> &'static str { "Editor" }
    fn title(&self, _: &Window, _: &App) -> AnyElement { SharedString::from("Editor").into_any_element() }
    fn closable(&self, _: &App) -> bool { false }
}
impl Focusable for Editor { fn focus_handle(&self, _: &App) -> FocusHandle { self.0.clone() } }
impl EventEmitter<PanelEvent> for Editor {}
impl Render for Editor {
    fn render(&mut self, _: &mut Window, cx: &mut Context<Self>) -> impl IntoElement {
        cx.notify(); div().flex_1().p_4().bg(rgb(0x252525)).child("Editor")
    }
}

struct Log(FocusHandle);
impl Log {
    fn new(cx: &mut Context<Self>) -> Self { Self(cx.focus_handle()) }
}
impl Panel for Log {
    fn panel_name(&self) -> &'static str { "Log" }
    fn title(&self, _: &Window, _: &App) -> AnyElement { SharedString::from("Log").into_any_element() }
    fn closable(&self, _: &App) -> bool { false }
}
impl Focusable for Log { fn focus_handle(&self, _: &App) -> FocusHandle { self.0.clone() } }
impl EventEmitter<PanelEvent> for Log {}
impl Render for Log {
    fn render(&mut self, _: &mut Window, cx: &mut Context<Self>) -> impl IntoElement {
        cx.notify(); div().flex_1().p_4().bg(rgb(0x1b1b1b)).child("Log")
    }
}

struct WorkspaceDemo {
    workspace: Entity<Workspace>,
}

impl WorkspaceDemo {
    fn new(window: &mut Window, cx: &mut Context<Self>) -> Self {
        let explorer = cx.new(|cx| Explorer::new(cx));
        let editor = cx.new(|cx| Editor::new(cx));
        let log = cx.new(|cx| Log::new(cx));

        let workspace = cx.new(|cx| Workspace::new("demo", window, cx));
        let w = workspace.clone();

        // Add panels via App context to avoid entity conflict with cx.new()
        let app: &mut App = &mut **cx;
        w.update(app, |ws, cx| {
            ws.add_panel(explorer, DockPlacement::Left, window, cx);
            ws.add_panel(editor, DockPlacement::Center, window, cx);
            ws.add_panel(log, DockPlacement::Bottom, window, cx);
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
        }).unwrap();
    });
}
