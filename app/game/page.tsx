import { NumberGame } from "@/components/game/number-game";
import { SiteHeader } from "@/components/site-header";

export default function GamePage() {
  return (
    <>
      <SiteHeader active="games" signedIn />
      <main className="mx-auto max-w-7xl px-3 py-4 sm:px-6 sm:py-7">
        <div className="mb-4 flex items-end justify-between gap-3 px-1">
          <div>
            <p className="eyebrow">PLAYROOM ARCADE</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">Fun Target</h1>
          </div>
          <span className="rounded-full border border-[#2a333a] bg-[#12171d] px-3 py-2 text-[9px] font-bold text-[#9ca8ae]">✳ PLAY TOKENS ONLY</span>
        </div>
        <NumberGame />
      </main>
      <footer className="mx-auto max-w-7xl px-4 py-7 text-center text-[10px] text-[#66737c]">
        Playroom is a play-money prototype. Tokens have no cash value and cannot be bought, transferred, or redeemed.
      </footer>
    </>
  );
}
