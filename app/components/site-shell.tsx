"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/creatives", label: "Creatives" },
  { href: "/courses", label: "Courses" },
  { href: "/contact", label: "Contact" },
];

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <header className="sticky top-0 z-50 border-b border-[#0A2540]/10 bg-[var(--bg)]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-center px-6 py-6 lg:px-8">
          <nav className="flex items-center gap-3 text-base font-semibold md:gap-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-4 py-2 transition ${
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
