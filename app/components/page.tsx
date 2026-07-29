"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CodeViewer } from "@/components/examples/CodeViewer";
import { WasmRuntime } from "@/components/examples/WasmRuntime";
import { X, FileCode, Cog } from "lucide-react";
import { cn } from "@/lib/utils";
import { componentCards } from "@/lib/generated-components";
import type { ComponentCard } from "@/lib/generated-components";

function ComponentCard({ card, onSelect }: { card: ComponentCard; onSelect: (c: ComponentCard) => void }) {
  return (
    <button
      onClick={() => onSelect(card)}
      className="group rounded-xl border border-white/[0.07] bg-white/[0.02] p-5 text-left hover:bg-white/[0.05] hover:border-white/[0.12] transition-all"
    >
      <h3 className="text-sm font-semibold text-white group-hover:text-[#38bdf8] transition-colors">{card.title}</h3>
      <p className="text-xs text-white/40 mt-1.5 leading-relaxed line-clamp-2">{card.description}</p>
      <div className="flex flex-wrap gap-1.5 mt-3">
        {card.tags.map((t) => (
          <span key={t} className="text-[10px] text-white/30 bg-white/[0.05] px-2 py-0.5 rounded">{t}</span>
        ))}
      </div>
    </button>
  );
}

export default function ComponentsPage() {
  const [selected, setSelected] = useState<ComponentCard | null>(null);
  const [codeTab, setCodeTab] = useState<"source" | "wasm">("source");

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-5 pb-24 pt-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Components</h1>
          <p className="text-sm text-white/40">
            GPUI component patterns. Click a card to view source and live WASM preview.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {componentCards.map((card, i) => (
            <motion.div key={card.slug} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
              <ComponentCard card={card} onSelect={setSelected} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fullscreen modal */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-black" onClick={() => setSelected(null)}>
          <div className="h-full flex flex-col" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06] shrink-0">
              <div>
                <h2 className="text-sm font-semibold text-white">{selected.title}</h2>
                <p className="text-xs text-white/40">{selected.description}</p>
              </div>
              <button onClick={() => setSelected(null)} className="text-white/30 hover:text-white/60 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Split panes */}
            <div className="flex-1 flex flex-col lg:flex-row min-h-0">
              {/* Left: Code */}
              <div className="flex-1 min-h-0 lg:w-1/2 p-2 overflow-hidden flex flex-col border-r border-white/[0.06]">
                <div className="flex gap-1 mb-2 shrink-0">
                  <button
                    onClick={() => setCodeTab("source")}
                    className={cn("flex items-center gap-1.5 px-3 py-1 text-xs font-mono rounded-md transition-colors",
                      codeTab === "source" ? "text-white bg-white/[0.07]" : "text-white/30 hover:text-white/60")}
                  >
                    <FileCode className="w-3 h-3" /> Source
                  </button>
                  <button
                    onClick={() => setCodeTab("wasm")}
                    className={cn("flex items-center gap-1.5 px-3 py-1 text-xs font-mono rounded-md transition-colors",
                      codeTab === "wasm" ? "text-white bg-white/[0.07]" : "text-white/30 hover:text-white/60")}
                  >
                    <Cog className="w-3 h-3" /> WASM
                  </button>
                </div>
                <div className="flex-1 min-h-0">
                  <CodeViewer
                    code={codeTab === "source" ? selected.source : selected.source}
                    fileName={codeTab === "source" ? `${selected.slug}.rs` : `${selected.slug}_wasm.rs`}
                  />
                </div>
              </div>

              {/* Right: Live Preview */}
              <div className="flex-1 min-h-0 lg:w-1/2 p-2 overflow-hidden">
                <WasmRuntime slug={selected.slug} title={selected.title} wasmPrefix="wasm-components" wasmNameOverride={`wc_${selected.slug.replace(/-/g, "_")}`} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
