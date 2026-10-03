import Link from "next/link";

export function Brand({ light = false }: { light?: boolean }) {
  return <Link href="/" className={`inline-flex items-center gap-2.5 font-semibold tracking-tight ${light ? "text-white" : "text-white"}`}>
    <span className="grid size-8 place-items-center rounded-xl bg-[#c8ed83] text-[#173c2b] text-lg">✳</span>
    <span className="text-[19px]">playroom<span className="text-[#c8f169]">.</span></span>
  </Link>;
}

export function Avatar({ initials = "AM", className = "" }: { initials?: string; className?: string }) {
  return <span className={`inline-grid size-9 shrink-0 place-items-center rounded-full bg-[#26351a] text-xs font-semibold text-[#c8f169] ${className}`}>{initials}</span>;
}
