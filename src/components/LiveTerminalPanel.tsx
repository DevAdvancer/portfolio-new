import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/** Current time in Kolkata, formatted HH:MM:SS regardless of the viewer's timezone. */
const getISTTime = () =>
  new Date().toLocaleTimeString("en-GB", {
    timeZone: "Asia/Kolkata",
    hour12: false,
  });

interface LineProps {
  cmd: string;
}

const Prompt = ({ cmd }: LineProps) => (
  <div className="flex items-center gap-2">
    <span className="text-primary select-none">$</span>
    <span className="text-foreground">{cmd}</span>
  </div>
);

/**
 * A glass "terminal" card for the hero — the distinctive, developer-authentic
 * centrepiece. Pure CSS + a single 1s interval for the live clock, cleared on
 * unmount. Under prefers-reduced-motion the clock is static and the caret/ping
 * stop (the global reduced-motion kill-switch neutralises the CSS animations).
 */
const LiveTerminalPanel = () => {
  const prefersReducedMotion = useReducedMotion();
  const [time, setTime] = useState(getISTTime);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const id = setInterval(() => setTime(getISTTime()), 1000);
    return () => clearInterval(id);
  }, [prefersReducedMotion]);

  return (
    <div className="relative w-full max-w-md mx-auto lg:mx-0">
      {/* Ambient multi-accent glow behind the panel */}
      <div className="pointer-events-none absolute -inset-6 -z-10 bg-gradient-to-tr from-primary/15 via-accent/10 to-chart-3/15 blur-3xl opacity-70" />

      <div className="overflow-hidden rounded-lg border border-border bg-card/70 backdrop-blur-xl shadow-2xl font-mono text-[13px] sm:text-sm">
        {/* Title bar */}
        <div className="flex items-center gap-2 border-b border-border bg-secondary/30 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 truncate text-xs text-muted-foreground">
            abhirup@portfolio — zsh
          </span>
        </div>

        {/* Body */}
        <div className="space-y-3 p-4 sm:p-5 leading-relaxed">
          <div className="space-y-1">
            <Prompt cmd="whoami" />
            <p className="text-foreground">
              Abhirup Kumar{" "}
              <span className="text-muted-foreground">— software developer</span>
            </p>
          </div>

          <div className="space-y-1">
            <Prompt cmd="cat focus.txt" />
            <p className="text-muted-foreground">
              Reliable, fast, well-crafted web apps.
            </p>
          </div>

          <div className="space-y-1.5">
            <Prompt cmd="status --now" />
            <ul className="space-y-1.5">
              <li className="flex items-center gap-2.5">
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400 text-emerald-400 live-ping" />
                <span className="text-foreground">shipping at Vizva</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="inline-flex h-2 w-2 rounded-full bg-chart-3" />
                <span className="text-muted-foreground">Kolkata, IN</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="inline-flex h-2 w-2 rounded-full bg-chart-5" />
                <span className="text-muted-foreground tabular-nums">
                  {time} IST
                </span>
              </li>
            </ul>
          </div>

          {/* Prompt line with blinking caret */}
          <div className="flex items-center gap-2 pt-1">
            <span className="text-primary select-none">$</span>
            <span className="inline-block h-4 w-2 bg-primary animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveTerminalPanel;
