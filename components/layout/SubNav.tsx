"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const SUB_LINKS = [
  { label: "Overview", href: "/" },
  { label: "Docs", href: "/docs" },
  { label: "Components", href: "/components" },
  { label: "Examples", href: "/examples" },
  { label: "API", href: "/api" },
];

export function SubNav() {
  const pathname = usePathname();

  return (
    <nav className="h-10 border-b border-white/[0.06] bg-[#080808]">
      <div className="max-w-7xl mx-auto px-5 h-full flex items-center gap-1">
        {SUB_LINKS.map(({ label, href }) => {
          const active = pathname === href;
          return (
            <Link
              key={label}
              href={href}
              className={cn(
                "px-3 py-1.5 text-xs font-medium rounded-md transition-colors",
                active
                  ? "text-white bg-white/[0.07]"
                  : "text-white/40 hover:text-white/70 hover:bg-white/[0.04]"
              )}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
