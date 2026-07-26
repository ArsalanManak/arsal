"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/creatives", label: "Creatives" },
  { href: "/contact", label: "Contact" },
];

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <header className="sticky top-0 z-50 border-b border-[#0A2540]/10 bg-[var(--bg)]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <Link href="/" className="text-lg font-semibold tracking-[0.3em] text-[#0A2540] uppercase">
            ARSAL
          </Link>
          <nav className="flex items-center gap-4 text-sm font-medium md:gap-6">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-3 py-2 transition ${
                    isActive
                      ? "bg-[#0A2540] text-white shadow-sm"
                      : "text-[#0A2540] hover:text-[#D62828]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer className="border-t border-[#0A2540]/10 bg-[#FAFAFA] px-6 py-8 text-sm text-[#4b5563]">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Arsal. DTC Ads Video Editor.</p>
          <p>Built for bold direct-to-consumer campaigns.</p>
        </div>
      </footer>
    </div>
  );
}
