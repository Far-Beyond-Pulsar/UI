"use client";

import { useEffect, useState } from "react";
import { Play, Maximize2 } from "lucide-react";

export function PreviewPane({ slug, title }: { slug: string; title: string }) {
  const [hasWasm, setHasWasm] = useState(false);

  useEffect(() => {
    fetch(`/examples/${slug}/index.html`)
      .then((r) => {
        if (r.ok) {
          // Check it's not the error stub
          return r.text().then((html) => {
            setHasWasm(!html.includes("WASM build not available"));
          });
        }
        setHasWasm(false);
      })
      .catch(() => setHasWasm(false));
  }, [slug]);

  if (hasWasm) {
    return (
      <div className="rounded-xl border border-white/[0.07] overflow-hidden bg-[#09090b] h-full flex flex-col">
        <div className="flex items-center justify-between px-4 py-2 border-b border-white/[0.06] bg-[#0c0c0f]">
          <span className="text-xs text-white/35 font-mono">Live Preview</span>
          <button
            className="text-white/30 hover:text-white/60 transition-colors"
            aria-label="Fullscreen"
            onClick={() => window.open(`/examples/${slug}/`, "_blank")}
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
        <iframe
          className="flex-1 w-full border-0"
          title={`${title} preview`}
          src={`/examples/${slug}/`}
        />
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-white/[0.07] overflow-hidden bg-[#09090b] h-full flex flex-col">
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/[0.06] bg-[#0c0c0f]">
        <span className="text-xs text-white/35 font-mono">Live Preview</span>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6 py-12">
        <div className="w-12 h-12 rounded-full border border-white/[0.08] bg-white/[0.03] flex items-center justify-center">
          <Play className="w-5 h-5 text-white/20" />
        </div>
        <div className="text-center">
          <p className="text-sm text-white/30 font-medium mb-1">WASM Preview</p>
          <p className="text-xs text-white/20 max-w-xs">
            WGPUI WebAssembly compilation is not yet available.{" "}
            <span className="text-white/30">
              Once WGPUI adds wasm32 target support, each example will compile to WASM and
              display a live interactive preview here.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
