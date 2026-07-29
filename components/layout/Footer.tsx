"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github } from "lucide-react";
import { p } from "@/lib/utils";

const SECTIONS = [
  {
    title: "WGPUI",
    links: [
      { label: "Documentation", href: "https://github.com/Far-Beyond-Pulsar/WGPUI" },
      { label: "Getting Started", href: "https://github.com/Far-Beyond-Pulsar/WGPUI" },
      { label: "API Reference", href: "https://github.com/Far-Beyond-Pulsar/WGPUI" },
    ],
  },
  {
    title: "Components",
    links: [
      { label: "Component Library", href: "/#components" },
      { label: "Theming", href: "/#features" },
      { label: "Code Editor", href: "/#components" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "GitHub", href: "https://github.com/Far-Beyond-Pulsar/WGPUI" },
      { label: "Issues", href: "https://github.com/Far-Beyond-Pulsar/WGPUI/issues" },
      { label: "Discussions", href: "https://github.com/Far-Beyond-Pulsar/WGPUI/discussions" },
    ],
  },
];

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <p className="text-xs font-semibold tracking-widest uppercase text-white/25 mb-4">{title}</p>
      <ul className="space-y-2.5">
        {links.map(({ label, href }) => {
          const isExternal = href.startsWith("http");
          return (
            <li key={label}>
              {isExternal ? (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/45 hover:text-white/80 transition-colors"
                >
                  {label}
                </a>
              ) : (
                <Link href={href} className="text-sm text-white/45 hover:text-white/80 transition-colors">
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/examples")) return null;

  return (
    <footer className="border-t border-white/[0.07] bg-black">
      <div className="max-w-7xl mx-auto px-5 pt-16 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Image src={p("/logos/wgpui_crop.png")} alt="" width={24} height={24} className="opacity-90" />
              <span className="text-sm font-semibold text-white">WGPUI</span>
            </div>
            <p className="text-sm text-white/40 leading-relaxed max-w-[220px]">
              A cross-platform GPU-accelerated UI framework for Rust, built on wgpu and winit.
              One codebase, every platform — with a rich component library included.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a
                href="https://github.com/Far-Beyond-Pulsar/WGPUI"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/35 hover:text-white/70 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {SECTIONS.map((s) => (
            <FooterCol key={s.title} title={s.title} links={s.links} />
          ))}
        </div>

        <div className="divider mb-8" />

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <p className="text-xs text-white/25">
            &copy; {new Date().getFullYear()} WGPUI. Open source under MIT.
          </p>
          <a
            href="https://github.com/Far-Beyond-Pulsar/WGPUI"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-white/25 hover:text-white/50 transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
