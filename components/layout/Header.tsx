"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Github, Menu, X } from "lucide-react";
import { p } from "@/lib/utils";

const BASE = (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_BASE_PATH) || "";

const NAV_LINKS = [
  { label: "Overview", href: "/" },
  { label: "Docs", href: "/docs" },
  { label: "Components", href: "/components" },
  { label: "Examples", href: "/examples" },
  { label: "API", href: "/api" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "bg-black/90 backdrop-blur-md border-white/[0.07]"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 h-14 grid grid-cols-[1fr_auto_1fr] items-center">
        {/* Left: Pulsar / WGPUI */}
        <div className="flex items-center gap-2 shrink-0 justify-self-start">
          <a href="https://pulsarnative.com" className="flex items-center gap-2" rel="noopener noreferrer">
            <Image
              src="https://far-beyond-pulsar.github.io/logos/pulsar.png"
              alt="Pulsar"
              width={24}
              height={24}
              className="opacity-80"
            />
          </a>
          <span className="text-white/40 text-sm font-medium">/</span>
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={p("/logos/wgpui_crop.png")}
              alt=""
              width={22}
              height={22}
              className="opacity-90"
            />
            <span className="text-white font-semibold text-[15px] tracking-tight">
              WGPUI
            </span>
          </Link>
        </div>

        {/* Center: Nav */}
        <nav className="hidden md:flex items-center gap-0.5 justify-self-center">
          {NAV_LINKS.map(({ label, href }, i) => (
            <Link
              key={label}
              href={href}
              className="px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-white/45 hover:text-white transition-colors rounded-md hover:bg-white/[0.05]"
            >
              <span className="text-[#38bdf8]/60 mr-1.5">0{i + 1}</span>
              {label}
            </Link>
          ))}
        </nav>

        {/* Right: GitHub */}
        <div className="flex items-center gap-2 justify-self-end">
          <a
            href="https://github.com/Far-Beyond-Pulsar/WGPUI"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-white/55 hover:text-white transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>

          <button
            className="md:hidden p-2 text-white/60 hover:text-white"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-lg border-t border-white/[0.07] px-5 py-4 flex flex-col gap-1">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="px-3 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/[0.05] rounded-md transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          <div className="mt-3 pt-3 border-t border-white/[0.07]">
            <a
              href="https://github.com/Far-Beyond-Pulsar/WGPUI"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2.5 text-sm text-white/60 hover:text-white"
            >
              <Github className="w-4 h-4" /> GitHub
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
