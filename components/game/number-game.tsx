 "use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { initialBets, initialResults, player, type Bet, type RoundResult } from "@/lib/mock-data";

const amounts = [10, 25, 50, 100];
const ROUND_SECONDS = 20;
const SPIN_MS = 3600;

function formatTime(seconds: number) {
  return `00:${String(seconds).padStart(2, "0")}`;
}

function wheelRotationFor(number: number, extraTurns = 5) {
  // Number 0 is at the top. Each segment is 36 degrees.
  return extraTurns * 360 + (360 - number * 36);
}

export function NumberGame() {
  const [seconds, setSeconds] = useState(ROUND_SECONDS);
  const [round, setRound] = useState(2842);
  const [picked, setPicked] = useState<number | null>(null);
  const [amount, setAmount] = useState(25);
  const [balance, setBalance] = useState(player.balance);
  const [bets, setBets] = useState<Bet[]>(initialBets);
  const [results, setResults] = useState<RoundResult[]>(initialResults);
  const [message, setMessage] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);
  const [winningNumber, setWinningNumber] = useState<number | null>(initialResults[0]?.number ?? 6);
  const [wheelRotation, setWheelRotation] = useState(0);

  const spin = useCallback(() => {
    if (isSpinning) return;

    const nextNumber = Math.floor(Math.random() * 10);
    const nextRound = round + 1;
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    setIsSpinning(true);
    setMessage("");
    setWheelRotation(wheelRotationFor(nextNumber, 5 + Math.floor(Math.random() * 3)));

    window.setTimeout(() => {
      setWinningNumber(nextNumber);
      setRound(nextRound);
      setResults((items) => [
        { round: nextRound, number: nextNumber, time },
        ...items,
      ].slice(0, 10));
      setIsSpinning(false);
      setSeconds(ROUND_SECONDS);
    }, SPIN_MS);
  }, [isSpinning, round]);

  useEffect(() => {
    if (isSpinning) return;

    const timer = window.setInterval(() => {
      setSeconds((current) => {
        if (current <= 1) {
          window.clearInterval(timer);
          spin();
          return 0;
        }
        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [isSpinning, spin]);

  function placeBet() {
    if (picked === null) {
      setMessage("Choose a number first.");
      return;
    }
    if (amount > balance) {
      setMessage("Choose an amount within your token balance.");
      return;
    }

    setBalance((current) => current - amount);
    setBets((old) => [
      { id: Date.now() + Math.random(), number: picked, amount, user: "You" },
      ...old,
    ]);
    setMessage(`${amount} play tokens added to number ${picked}.`);
  }

  const totals = useMemo(
    () =>
      Array.from({ length: 10 }, (_, number) =>
        bets.filter((bet) => bet.number === number).reduce((sum, bet) => sum + bet.amount, 0),
      ),
    [bets],
  );

  const yourWinningBet = winningNumber === null
    ? 0
    : bets
        .filter((bet) => bet.user === "You" && bet.number === winningNumber)
        .reduce((sum, bet) => sum + bet.amount, 0);

  // Fixed mock multiplier for the play-money prototype only.
  const mockWin = yourWinningBet * 2;

  return (
    <div className="space-y-4">
      <section className="game-shell overflow-hidden">
        <div className="game-topbar">
          <div className="game-stat">
            <span className="game-label">YOUR SCORE</span>
            <strong>{balance.toLocaleString()} <i>✳</i></strong>
            <small>Play tokens</small>
          </div>

          <div className="game-round">
            <span className="game-label">ROUND</span>
            <strong>#{round.toLocaleString()}</strong>
            <span className={isSpinning ? "live-dot spinning" : "live-dot"}>{isSpinning ? "SPINNING" : "LIVE"}</span>
          </div>

          <div className="game-stat game-stat-right">
            <span className="game-label">WINNER</span>
            <strong>{winningNumber ?? "—"} <i>✳</i></strong>
            <small>{yourWinningBet ? `Your mock win: ${mockWin} ✳` : "Awaiting your number"}</small>
          </div>
        </div>

        <div className="game-stage">
          <aside className="game-side-panel left-panel">
            <div>
              <span className="game-label">YOUR POINTS</span>
              <strong className="side-score">{balance.toLocaleString()} <i>✳</i></strong>
              <p>Available play tokens</p>
            </div>

            <div className="timer-card">
              <span className="game-label">NEXT DRAW</span>
              <strong>{isSpinning ? "SPIN" : formatTime(seconds)}</strong>
              <div className="timer-track">
                <div style={{ width: `${isSpinning ? 100 : (seconds / ROUND_SECONDS) * 100}%` }} />
              </div>
              <p>{isSpinning ? "Wheel is spinning..." : "Pick your number before the timer ends."}</p>
            </div>
          </aside>

          <div className="wheel-zone">
            <div className="wheel-title">
              <span>FUN TARGET</span>
              <small>{isSpinning ? "DRAWING..." : "PICK • PLAY • SPIN"}</small>
            </div>

            <div className={`target-wheel-wrap ${isSpinning ? "is-spinning" : ""}`}>
              <div className="wheel-pointer" aria-hidden="true" />
              <div
                className="target-wheel"
                style={{ transform: `rotate(${wheelRotation}deg)` }}
                aria-label="Number wheel"
              >
                <div className="wheel-face">
                  {Array.from({ length: 10 }, (_, number) => {
                    const angle = number * 36;
                    return (
                      <span
                        key={number}
                        className={`wheel-number ${number === winningNumber && !isSpinning ? "winner-number" : ""}`}
                        style={{ transform: `rotate(${angle}deg) translateY(-41%) rotate(${-angle}deg)` }}
                      >
                        {number}
                      </span>
                    );
                  })}
                  <div className="wheel-center">
                    <span>✳</span>
                    <b>{isSpinning ? "..." : winningNumber ?? "?"}</b>
                    <small>WIN</small>
                  </div>
                </div>
              </div>
            </div>

            <div className="wheel-status">
              {isSpinning ? "The wheel is finding the next number..." : `Last result: ${winningNumber ?? "—"}`}
            </div>
          </div>

          <aside className="game-side-panel right-panel">
            <div>
              <span className="game-label">WINNER</span>
              <strong className="winner-number-large">{winningNumber ?? "—"}</strong>
              <p>{yourWinningBet ? `You played ${yourWinningBet} ✳ on it.` : "Your result for this round."}</p>
              <div className="win-box">
                <span>MOCK PAYOUT</span>
                <strong>{mockWin.toLocaleString()} ✳</strong>
              </div>
            </div>

            <div>
              <span className="game-label">LAST 10 DATA</span>
              <div className="history-dots">
                {results.map((result) => (
                  <div key={result.round} className="history-dot" title={`Round #${result.round}`}>
                    <span>{result.number}</span>
                    <small>#{result.round}</small>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>

        <div className="betting-deck">
          <div className="betting-head">
            <div>
              <span className="game-label">CHOOSE YOUR TARGET</span>
              <h2>Place your play</h2>
            </div>
            <div className="selected-readout">
              {picked === null ? "Select a number" : <>Number <b>{picked}</b> · {amount} ✳</>}
            </div>
          </div>

          <div className="number-board">
            {Array.from({ length: 10 }, (_, number) => (
              <button
                key={number}
                type="button"
                onClick={() => {
                  setPicked(number);
                  setMessage("");
                }}
                aria-pressed={picked === number}
                className={`target-number ${picked === number ? "selected" : ""} ${winningNumber === number && !isSpinning ? "last-winner" : ""}`}
              >
                <span>{number}</span>
                <small>{totals[number] ? `${totals[number]} ✳` : "—"}</small>
              </button>
            ))}
          </div>

          <div className="bet-controls">
            <div className="amount-pills">
              {amounts.map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setAmount(value)}
                  className={amount === value ? "active" : ""}
                >
                  {value} ✳
                </button>
              ))}
            </div>
            <button type="button" onClick={placeBet} disabled={isSpinning} className="place-bet">
              {isSpinning ? "Wheel spinning..." : `Place ${amount} token${amount === 1 ? "" : "s"} ↗`}
            </button>
          </div>

          {message && <p role="status" className="game-message">{message}</p>}
          <p className="game-disclaimer">Play tokens only · no cash value · no purchases or withdrawals · outcomes are generated randomly by the prototype.</p>
        </div>
      </section>
    </div>
  );
}
