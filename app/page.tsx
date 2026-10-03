import Link from "next/link";
import { initialResults, player, activity } from "@/lib/mock-data";
import { SiteHeader } from "@/components/site-header";

export default function DashboardPage() {
  return (
    <>
      <SiteHeader active="dashboard" signedIn />
      <main className="mx-auto max-w-7xl px-4 py-7 sm:px-7 sm:py-10">
        <section className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">PLAYER DASHBOARD</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">Hey, {player.name.split(" ")[0]} 👋</h1>
            <p className="mt-2 text-sm text-[#89959d]">Your playroom at a glance. Everything here uses mock play tokens.</p>
          </div>
          <Link href="/game" className="rounded-full bg-[#c8f169] px-5 py-3 text-xs font-bold text-[#11180a] hover:bg-[#d8ff80]">
            Play Fun Target ↗
          </Link>
        </section>

        <section className="grid gap-4 sm:grid-cols-3">
          {[
            { label: "Play token balance", value: `${player.balance.toLocaleString()} ✳`, note: "Mock tokens · no cash value" },
            { label: "Rounds played", value: "38", note: "Sample activity" },
            { label: "Last result", value: `${initialResults[0].number}`, note: `Round #${initialResults[0].round}` },
          ].map((item) => (
            <article key={item.label} className="panel p-5">
              <p className="text-xs text-[#89959d]">{item.label}</p>
              <p className="mt-3 text-3xl font-bold">{item.value}</p>
              <p className="mt-1 text-[10px] text-[#74818a]">{item.note}</p>
            </article>
          ))}
        </section>

        <section className="mt-5 grid gap-5 lg:grid-cols-[1.35fr_.65fr]">
          <article className="panel overflow-hidden">
            <div className="border-b border-[#252d35] p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="eyebrow">LIVE GAME</p>
                  <h2 className="mt-2 text-xl font-semibold">Fun Target</h2>
                  <p className="mt-1 text-sm text-[#85929d]">Choose 0–9, place play tokens, then watch the wheel spin.</p>
                </div>
                <span className="hidden rounded-full bg-[#28361d] px-3 py-1.5 text-[9px] font-bold text-[#c8f169] sm:block">PLAY MONEY</span>
              </div>
            </div>
            <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-6">
              <div className="rounded-2xl border border-[#283139] bg-[#0d1216] p-5">
                <span className="game-label">NEXT DRAW</span>
                <p className="mt-3 text-4xl font-black tabular-nums">00:20</p>
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#252d33]"><div className="h-full w-2/3 rounded-full bg-[#c8f169]" /></div>
                <p className="mt-3 text-xs text-[#74818a]">The wheel automatically starts when the timer ends.</p>
              </div>
              <div className="rounded-2xl border border-[#283139] bg-[#0d1216] p-5">
                <span className="game-label">LAST 10</span>
                <div className="mt-4 flex flex-wrap gap-2">
                  {initialResults.map((result) => (
                    <span key={result.round} className="grid size-9 place-items-center rounded-full bg-[#202a2d] text-sm font-bold text-[#c8f169]">{result.number}</span>
                  ))}
                </div>
                <p className="mt-4 text-xs text-[#74818a]">Recent winning numbers are shown after every round.</p>
              </div>
            </div>
            <div className="border-t border-[#252d35] p-5 sm:p-6">
              <Link href="/game" className="block rounded-xl bg-[#c8f169] py-3.5 text-center text-sm font-bold text-[#11180a] hover:bg-[#d8ff80]">
                Enter Fun Target ↗
              </Link>
            </div>
          </article>

          <article className="panel p-5 sm:p-6">
            <div>
              <p className="eyebrow">RECENT ACTIVITY</p>
              <h2 className="mt-2 text-xl font-semibold">Your play history</h2>
            </div>
            <div className="mt-5 divide-y divide-[#252d35]">
              {activity.map((item, index) => (
                <div key={`${item.title}-${index}`} className="flex items-center justify-between gap-3 py-4 first:pt-0 last:pb-0">
                  <div>
                    <p className="text-xs font-medium">{item.title}</p>
                    <p className="mt-1 text-[10px] text-[#74818a]">{item.date}</p>
                  </div>
                  <span className={`text-xs font-bold ${item.positive ? "text-[#c8f169]" : "text-[#9aa6ad]"}`}>{item.change} ✳</span>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="mt-5 rounded-2xl border border-[#303a2d] bg-[#141911] p-5">
          <p className="text-sm font-semibold text-[#d8e7c4]">Playroom rules</p>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-[#929f8a]">
            This prototype uses sample play tokens only. Tokens cannot be bought, transferred, withdrawn, or redeemed. Fun Target outcomes are generated randomly by the game and are not controlled by an operator.
          </p>
        </section>
      </main>
    </>
  );
}
