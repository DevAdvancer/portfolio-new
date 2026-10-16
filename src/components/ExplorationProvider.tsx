import { useState, type ReactNode, type FormEvent } from "react";
import { X } from "lucide-react";
import SecretTerminal from "@/components/SecretTerminal";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { ExplorationContext } from "@/hooks/use-exploration";

const STORAGE_KEY = "ak:between-the-lines:v1";

const readProgress = () => {
  try { const value = Number(localStorage.getItem(STORAGE_KEY)); return Number.isInteger(value) && value >= 0 && value <= 3 ? value : 0; } catch { return 0; }
};
export const ExplorationProvider = ({ children }: { children: ReactNode }) => {
  const [step, setStep] = useState(readProgress);
  const [hint, setHint] = useState("");
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [returnFocus, setReturnFocus] = useState<HTMLElement | null>(null);
  const [noteOpen, setNoteOpen] = useState(false);
  const [answer, setAnswer] = useState("");
  const [incorrect, setIncorrect] = useState(false);
  const discover = (clue: number) => {
    if (step === 3) { setReturnFocus(document.activeElement as HTMLElement); setTerminalOpen(true); setHint(""); return; }
    if (clue > step) { setHint(step === 0 ? "A footnote without a story. A little mark has wandered off the desk notes above." : "You have the first signal. Look for its twin beside the story about me."); return; }
    if (clue === 1 && step === 1) {
      setReturnFocus(document.activeElement as HTMLElement);
      setAnswer(""); setIncorrect(false); setNoteOpen(true); setHint(""); return;
    }
    const next = Math.max(step, clue + 1);
    setStep(next);
    try { localStorage.setItem(STORAGE_KEY, String(next)); } catch { /* Discovery works without storage too. */ }
    if (next === 3) { setReturnFocus(document.activeElement as HTMLElement); setTerminalOpen(true); setHint(""); }
    else setHint(next === 1 ? "01 / A signal found. Find its twin beside the story about me." : "02 / Two marks, one trail. The final footnote waits at the very bottom.");
  };
  const reset = () => { setStep(0); try { localStorage.removeItem(STORAGE_KEY); } catch { /* Optional persistence. */ } setTerminalOpen(false); setHint(""); };
  const solve = (event: FormEvent) => {
    event.preventDefault();
    if (!["space", "spacebar", "space bar", "the spacebar", "a space", "the space bar"].includes(answer.trim().toLowerCase())) { setIncorrect(true); return; }
    setStep(2);
    try { localStorage.setItem(STORAGE_KEY, "2"); } catch { /* Optional persistence. */ }
    setNoteOpen(false);
    setHint("02 / A little space opens a door. The final footnote waits at the very bottom.");
  };
  return <ExplorationContext.Provider value={{ step, discover }}>
    {children}
    {hint && <aside className="discovery-hint" aria-label="Discovery clue"><p role="status">{hint}</p><button onClick={() => setHint("")} aria-label="Dismiss clue"><X size={14} /></button></aside>}
    <Dialog open={noteOpen} onOpenChange={setNoteOpen}><DialogContent className="clue-note" onCloseAutoFocus={event => { event.preventDefault(); if (returnFocus?.isConnected) returnFocus.focus(); }}>
      <p className="folio-kicker">A NOTE IN THE MARGIN / 02</p>
      <DialogTitle>A little breathing room.</DialogTitle>
      <DialogDescription>I sit between words and under your thumbs.<br />I leave a gap, but here I open a door.<br /><br />What am I?</DialogDescription>
      <form onSubmit={solve}><label className="sr-only" htmlFor="clue-answer">Your answer to the margin note</label><input id="clue-answer" value={answer} onChange={event => { setAnswer(event.target.value); setIncorrect(false); }} autoComplete="off" placeholder="a small thought…" aria-invalid={incorrect} aria-describedby={incorrect ? "clue-feedback" : undefined} maxLength={60} required /><button type="submit">Try it ↗</button></form>
      {incorrect && <p id="clue-feedback" role="status" className="clue-feedback">A hint: think of the longest key on a keyboard.</p>}
    </DialogContent></Dialog>
    <SecretTerminal open={terminalOpen} onOpenChange={setTerminalOpen} onReset={reset} returnFocus={returnFocus} />
  </ExplorationContext.Provider>;
};
