import Link from "next/link";
import { Brand } from "@/components/brand";

export function SiteHeader({ active = "dashboard", signedIn = true }: { active?: string; signedIn?: boolean }) {
  const links = [
    { href: "/", label: "Dashboard", key: "dashboard" },
    { href: "/game", label: "Fun Target", key: "games" },
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-[#252d35] bg-[#0b0e12]/90 backdrop-blur">
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-4 sm:px-7">
        <Brand />
        <nav className="hidden items-center gap-7 sm:flex" aria-label="Main navigation">
          {links.map((link) => (
            <Link key={link.key} href={link.href} className={`text-sm ${active === link.key ? "font-semibold text-[#c8f169]" : "text-[#9aa5af] hover:text-white"}`}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          {signedIn && <span className="hidden text-sm font-medium text-[#c8f169] sm:inline">2,450 ✳</span>}
          <span className="grid size-9 place-items-center rounded-full border border-[#38423b] bg-[#1b2418] text-[10px] font-bold text-[#c8f169]">AM</span>
        </div>
      </div>
    </header>
  );
}
