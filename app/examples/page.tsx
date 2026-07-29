"use client";

import { useState } from "react";
import { CodeViewer } from "@/components/examples/CodeViewer";
import { WasmRuntime } from "@/components/examples/WasmRuntime";
import { cn } from "@/lib/utils";
import { examples, wasmBuildMeta } from "@/lib/generated-examples";
import { ChevronLeft, AlertTriangle, FileCode, Cog } from "lucide-react";

export default function ExamplesPage() {
  const [active, setActive] = useState(examples[0]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [codeTab, setCodeTab] = useState<"source" | "wasm">("source");

  const meta = wasmBuildMeta[active.slug];

  return (
    <div className="h-[calc(100vh-56px)] bg-black text-white flex overflow-hidden">
      {/* Sidebar */}
      <aside
        className={cn(
          "border-r border-white/[0.06] bg-[#080808] flex flex-col shrink-0 transition-all duration-200",
          sidebarOpen ? "w-56" : "w-0 overflow-hidden",
        )}
      >
        <div className="p-3 border-b border-white/[0.06] shrink-0">
          <p className="text-[10px] font-semibold tracking-widest uppercase text-white/20">Examples</p>
        </div>
        <nav className="flex-1 overflow-y-auto py-2 px-2">
          {examples.map((ex) => {
            const m = wasmBuildMeta[ex.slug];
            return (
              <button
                key={ex.slug}
                onClick={() => setActive(ex)}
                className={cn(
                  "w-full flex items-center gap-2 text-left px-3 py-1.5 rounded-md text-xs transition-colors",
                  active.slug === ex.slug ? "text-white bg-white/[0.07]" : "text-white/40 hover:text-white/70 hover:bg-white/[0.04]",
                )}
              >
                <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", m?.ok ? "bg-[#22c55e]" : "bg-white/15")} />
                <span className="truncate">{ex.title}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Toolbar */}
        <div className="flex items-center gap-3 px-4 py-2 border-b border-white/[0.06] shrink-0">
          <button onClick={() => setSidebarOpen((s) => !s)} className="text-white/30 hover:text-white/60 transition-colors" aria-label="Toggle sidebar">
            <ChevronLeft className={cn("w-4 h-4 transition-transform", !sidebarOpen && "rotate-180")} />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-sm font-semibold text-white truncate">{active.title}</h1>
            <p className="text-xs text-white/35 truncate leading-tight">{active.description}</p>
          </div>
          {meta && !meta.ok && (
            <div className="flex items-center gap-1 px-2 py-1 rounded bg-[#ef4444]/10 border border-[#ef4444]/20 shrink-0">
              <AlertTriangle className="w-3 h-3 text-[#ef4444]" />
              <span className="text-[10px] text-[#ef4444] font-mono">no wasm</span>
            </div>
          )}
        </div>

        {/* Split panes */}
        <div className="flex-1 flex flex-col lg:flex-row min-h-0">
          {/* Code */}
          <div className="flex-1 min-h-0 lg:w-1/2 p-2 lg:p-3 overflow-hidden flex flex-col">
            {/* Tab bar */}
            <div className="flex gap-1 mb-2 shrink-0">
              <button
                onClick={() => setCodeTab("source")}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1 text-xs font-mono rounded-md transition-colors",
                  codeTab === "source" ? "text-white bg-white/[0.07]" : "text-white/30 hover:text-white/60",
                )}
              >
                <FileCode className="w-3 h-3" />
                Source
              </button>
              <button
                onClick={() => setCodeTab("wasm")}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1 text-xs font-mono rounded-md transition-colors",
                  codeTab === "wasm" ? "text-white bg-white/[0.07]" : "text-white/30 hover:text-white/60",
                )}
              >
                <Cog className="w-3 h-3" />
                WASM
              </button>
            </div>
            <div className="flex-1 min-h-0">
              <CodeViewer
                code={codeTab === "source" ? active.source : active.wasmSource}
                fileName={codeTab === "source" ? `${active.slug}.rs` : `${active.slug}_wasm.rs`}
              />
            </div>
          </div>

          {/* Preview */}
          <div className="flex-1 min-h-0 lg:w-1/2 p-2 lg:p-3 overflow-hidden">
            {meta?.ok ? (
              <WasmRuntime slug={active.slug} title={active.title} />
            ) : (
              <div className="rounded-xl border border-white/[0.07] h-full flex flex-col bg-[#09090b]">
                <div className="flex items-center justify-between px-4 py-2 border-b border-white/[0.06] bg-[#0c0c0f] shrink-0">
                  <span className="text-xs text-white/35 font-mono">Live Preview</span>
                </div>
                <div className="flex-1 flex items-center justify-center p-6 overflow-auto">
                  <div className="max-w-sm text-center space-y-3">
                    <p className="text-sm text-white/30 font-medium">WASM not available</p>
                    <p className="text-xs text-white/20 leading-relaxed">
                      WGPUI does not yet compile to <code className="text-[#0ea5e9]">wasm32-unknown-unknown</code>.
                    </p>
                    {meta?.error && (
                      <details className="text-left">
                        <summary className="text-[10px] text-white/25 cursor-pointer hover:text-white/50">build error</summary>
                        <pre className="text-[10px] text-[#ef4444]/70 font-mono mt-2 p-3 rounded bg-white/[0.03] whitespace-pre-wrap max-h-32 overflow-y-auto">{meta.error}</pre>
                      </details>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
