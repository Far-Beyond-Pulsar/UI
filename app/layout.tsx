import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "WGPUI — Cross-Platform GPU UI",
  description:
    "A cross-platform GPU-accelerated UI framework for Rust, built on wgpu and winit. Rich component library included.",
  icons: {
    icon: "/logos/wgpui_crop.png",
    shortcut: "/logos/wgpui_crop.png",
    apple: "/logos/wgpui_crop.png",
  },
  openGraph: {
    title: "WGPUI — GPU-Accelerated UI for Rust",
    description:
      "Cross-platform GPU UI framework built on wgpu. One codebase, every platform.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased bg-black text-white">
        <Header />
        <div className="pt-14">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
