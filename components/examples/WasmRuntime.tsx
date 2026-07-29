"use client";

import { Maximize2 } from "lucide-react";

const BASE = (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_BASE_PATH) || "";

interface WasmRuntimeProps {
  slug: string;
  title: string;
  wasmPrefix?: string;
  wasmNameOverride?: string;
}

export function WasmRuntime({ slug, title, wasmPrefix = "wasm", wasmNameOverride }: WasmRuntimeProps) {
  const baseUrl = `${BASE}/${wasmPrefix}/${slug}`;
  const wasmName = wasmNameOverride || `wgpui_${slug.replace(/-/g, "_")}`;

  return (
    <div className="rounded-xl border border-white/[0.07] overflow-hidden bg-[#09090b] h-full flex flex-col">
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/[0.06] bg-[#0c0c0f] shrink-0">
        <span className="text-xs text-white/35 font-mono">Live Preview</span>
        <button
          className="text-white/30 hover:text-white/60 transition-colors"
          aria-label="Fullscreen"
          onClick={() => window.open(`${baseUrl}/index.html`, "_blank")}
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
      </div>
      <iframe
        className="flex-1 w-full border-0"
        title={`${title} preview`}
        src={`${baseUrl}/index.html`}
      />
    </div>
  );
}
