"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";

const LINE_HEIGHT = 20;

function resolveLang(name: string): string {
  const map: Record<string, string> = {
    rs: "rust",
    rust: "rust",
    js: "javascript",
    ts: "typescript",
    toml: "ini",
  };
  return map[name] ?? "plaintext";
}

export function CodeViewer({
  code,
  language = "rust",
  fileName,
}: {
  code: string;
  language?: string;
  fileName?: string;
}) {
  const monaco = useMonaco();
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(300);

  useEffect(() => {
    if (!monaco) return;
    monaco.editor.defineTheme("helio-dark", {
      base: "vs-dark",
      inherit: true,
      rules: [],
      colors: {
        "editor.background": "#09090b",
        "editor.lineHighlightBackground": "#ffffff08",
        "editorLineNumber.foreground": "#ffffff22",
        "editorLineNumber.activeForeground": "#ffffff45",
        "editor.selectionBackground": "#0ea5e930",
        "editorIndentGuide.background1": "#ffffff0a",
        "editorIndentGuide.activeBackground1": "#ffffff18",
        "scrollbarSlider.background": "#ffffff10",
        "scrollbarSlider.hoverBackground": "#ffffff20",
        "scrollbarSlider.activeBackground": "#ffffff30",
        "editor.lineHighlightBorder": "#00000000",
      },
    });
    monaco.editor.setTheme("helio-dark");
  }, [monaco]);

  // Fill container height
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setHeight(entry.contentRect.height - (fileName ? 33 : 0));
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [fileName]);

  const handleMount = useCallback((editor: any) => {
    // Sync content height within bounds
    const sync = () => {
      const container = containerRef.current;
      if (container) {
        setHeight(container.clientHeight - (fileName ? 33 : 0));
      }
    };
    editor.onDidContentSizeChange(sync);
  }, [fileName]);

  return (
    <div ref={containerRef} className="rounded-xl border border-white/[0.07] overflow-hidden bg-[#09090b] h-full">
      {fileName && (
        <div className="flex items-center justify-between px-4 py-1.5 border-b border-white/[0.06] bg-[#0c0c0f] shrink-0">
          <span className="text-xs text-white/35 font-mono">{fileName}</span>
          <span className="text-[10px] text-white/20 uppercase tracking-wider">{language}</span>
        </div>
      )}
      <div style={{ height: Math.max(height, 100) }}>
        <Editor
          height="100%"
          language={resolveLang(language)}
          value={code}
          theme="helio-dark"
          onMount={handleMount}
          options={{
            readOnly: true,
            domReadOnly: true,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            lineNumbers: "on",
            lineNumbersMinChars: 3,
            glyphMargin: false,
            folding: false,
            lineDecorationsWidth: 10,
            renderLineHighlight: "none",
            overviewRulerBorder: false,
            overviewRulerLanes: 0,
            hideCursorInOverviewRuler: true,
            scrollbar: {
              vertical: "hidden",
              horizontal: "hidden",
              alwaysConsumeMouseWheel: false,
            },
            fontSize: 13,
            lineHeight: LINE_HEIGHT,
            fontFamily: '"JetBrains Mono", ui-monospace, monospace',
            fontLigatures: true,
            padding: { top: 12, bottom: 12 },
            contextmenu: false,
            links: false,
            occurrencesHighlight: "off",
            selectionHighlight: false,
            matchBrackets: "never",
            guides: { indentation: true, bracketPairs: false },
            wordWrap: "off",
            renderWhitespace: "none",
            cursorWidth: 0,
            mouseWheelZoom: false,
            quickSuggestions: false,
            suggestOnTriggerCharacters: false,
            acceptSuggestionOnEnter: "off",
            tabCompletion: "off",
            wordBasedSuggestions: "off",
            parameterHints: { enabled: false },
            hover: { enabled: false },
            fixedOverflowWidgets: true,
          }}
        />
      </div>
    </div>
  );
}
