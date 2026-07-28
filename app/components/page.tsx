"use client";

import { motion } from "framer-motion";
import { CodeBlock } from "@/components/ui/CodeBlock";

const COMPONENTS = [
  {
    category: "Buttons",
    items: [
      {
        name: "Button",
        desc: "Primary action button with hover, active, focus, and disabled states.",
        code: `use wgpui::*;
use wgpui_component::*;

button()
    .label("Click Me")
    .variant(ButtonVariant::Primary)
    .on_click(cx.listener(|_, _, cx| {
        cx.dispatch_action(SomeAction);
    }))
    .into_element()`,
      },
      {
        name: "IconButton",
        desc: "Circular button with an icon, no text label.",
        code: `icon_button()
    .icon(Icon::Settings)
    .size(IconButtonSize::Md)
    .tooltip("Settings")
    .on_click(cx.listener(handle_settings))`,
      },
    ],
  },
  {
    category: "Inputs & Forms",
    items: [
      {
        name: "TextInput",
        desc: "Single-line text input with placeholder, label, and validation.",
        code: `text_input()
    .placeholder("Enter your name...")
    .label("Username")
    .value(self.name.clone())
    .on_input(cx.listener(|_, text, cx| {
        self.name = text;
        cx.notify();
    }))`,
      },
      {
        name: "Select",
        desc: "Dropdown select with search, groups, and keyboard navigation.",
        code: `select()
    .options(vec![
        SelectOption::new("1", "Option 1"),
        SelectOption::new("2", "Option 2"),
        SelectOption::new("3", "Option 3"),
    ])
    .value(self.selected.clone())
    .on_change(cx.listener(|_, val, cx| {
        self.selected = val;
        cx.notify();
    }))`,
      },
    ],
  },
  {
    category: "Navigation",
    items: [
      {
        name: "Tabs",
        desc: "Tab bar with underline indicator, closable tabs, and drag reorder.",
        code: `tabs()
    .tabs(vec![
        Tab::new("editor", "Editor"),
        Tab::new("preview", "Preview"),
        Tab::new("terminal", "Terminal"),
    ])
    .active(self.active_tab.clone())
    .on_change(cx.listener(|_, tab, cx| {
        self.active_tab = tab;
        cx.notify();
    }))`,
      },
      {
        name: "Breadcrumbs",
        desc: "Navigation breadcrumbs with collapse and custom separators.",
        code: `breadcrumbs()
    .items(vec![
        Crumb::new("Home", "/"),
        Crumb::new("Documents", "/docs"),
        Crumb::new("Reports", "/docs/reports"),
    ])
    .on_navigate(cx.listener(handle_navigate))`,
      },
    ],
  },
  {
    category: "Overlays",
    items: [
      {
        name: "Modal",
        desc: "Dialog overlay with backdrop, close button, and focus trap.",
        code: `modal()
    .title("Confirm Action")
    .open(self.show_modal)
    .on_close(cx.listener(|_, _, cx| {
        self.show_modal = false;
        cx.notify();
    }))
    .child(
        div()
            .child("Are you sure you want to proceed?")
            .child(
                div().flex().gap_2().mt_4()
                    .child(button().label("Cancel").variant(ButtonVariant::Secondary))
                    .child(button().label("Confirm").variant(ButtonVariant::Danger))
            )
    )`,
      },
      {
        name: "Popover",
        desc: "Floating popover positioned relative to a trigger element.",
        code: `popover()
    .trigger(
        button().label("Open Menu")
    )
    .content(
        div().p_2().flex_col().gap_1()
            .child(menu_item("Edit"))
            .child(menu_item("Copy"))
            .child(menu_item("Delete"))
    )`,
      },
    ],
  },
  {
    category: "Data Display",
    items: [
      {
        name: "Table",
        desc: "Virtualized table with sortable columns, selection, and resize.",
        code: `table()
    .columns(vec![
        Column::new("name", "Name").sortable(),
        Column::new("age", "Age").sortable().width(px(80.)),
        Column::new("email", "Email"),
    ])
    .rows(self.users.iter().map(|u| {
        Row::new(u.id.clone())
            .cell(u.name.clone())
            .cell(u.age.to_string())
            .cell(u.email.clone())
    }).collect())
    .on_sort(cx.listener(handle_sort))`,
      },
      {
        name: "Code Editor",
        desc: "Tree-sitter-based code editor with syntax highlighting, minimap, and multi-cursor.",
        code: `use wgpui_component::editor::*;

code_editor()
    .buffer(self.buffer.clone())
    .language("rust")
    .theme("pulsar-dark")
    .show_minimap(true)
    .show_line_numbers(true)
    .on_change(cx.listener(|_, _, cx| {
        self.dirty = true;
        cx.notify();
    }))`,
      },
    ],
  },
  {
    category: "Layout",
    items: [
      {
        name: "ResizablePanel",
        desc: "Splittable panel container with drag handles and collapse.",
        code: `resizable_panel()
    .direction(Direction::Horizontal)
    .panels(vec![
        Panel::new("sidebar").min_width(px(200.)).max_width(px(400.)),
        Panel::new("main").flex(1.),
        Panel::new("outline").min_width(px(150.)).max_width(px(300.)),
    ])
    .on_resize(cx.listener(handle_resize))`,
      },
      {
        name: "VirtualList",
        desc: "High-performance virtual scrolling list for large datasets.",
        code: `virtual_list()
    .items(self.items.clone())
    .item_height(px(48.))
    .render(move |item, _cx| {
        list_item()
            .child(span().text_color(rgb(0xffffff)).child(item.label.clone()))
    })
    .on_select(cx.listener(handle_select))`,
      },
    ],
  },
];

export default function ComponentsPage() {
  return (
    <div className="bg-black text-white">
      <div className="max-w-4xl mx-auto px-5 pb-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16 pt-12">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Components</h1>
          <p className="text-sm text-white/40">
            WGPUI-Component provides 40+ reusable UI primitives. Every component is GPU-accelerated,
            themeable, and built for performance.
          </p>
        </motion.div>

        {COMPONENTS.map((group, i) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="mb-16"
          >
            <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <span className="w-1 h-4 rounded-full bg-[#0ea5e9]" />
              {group.category}
            </h2>

            <div className="space-y-8">
              {group.items.map((item) => (
                <div
                  key={item.name}
                  className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-5"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-sm font-semibold text-white">{item.name}</h3>
                      <p className="text-xs text-white/40 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                  <CodeBlock code={item.code} />
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
