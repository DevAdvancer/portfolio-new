import { useEffect, useRef, useState, type KeyboardEvent, type FormEvent } from "react";
import { Loader2, MessageCircle } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { secretFiles } from "@/data/secretContent";
import { askTerminal } from "@/lib/terminalAssistant";
import type { GroqMessage } from "@/lib/groq";

interface Entry { command?: string; output: string; source?: "ai" | "saved" }
const welcome: Entry[] = [{ output: "Connection found.\nWelcome to the space between the lines.\n\nType help to look around, or ask <question> to talk to my AI.\nCode, coffee, games—make yourself at home." }];
const commands = ["help", "ls", "cat", "context", "ask", "ai", "whoami", "date", "clear", "exit", "reset"];

const SecretTerminal = ({ open, onOpenChange, onReset, returnFocus }: { open: boolean; onOpenChange: (open: boolean) => void; onReset: () => void; returnFocus: HTMLElement | null }) => {
  const [entries, setEntries] = useState<Entry[]>(welcome);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isAsking, setIsAsking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<AbortController | null>(null);
  const requestId = useRef(0);
  const aiHistory = useRef<GroqMessage[]>([]);
  const lastReadFile = useRef<string | undefined>(undefined);

  useEffect(() => { if (outputRef.current) outputRef.current.scrollTop = outputRef.current.scrollHeight; }, [entries, open, isAsking]);
  useEffect(() => () => { requestId.current++; requestRef.current?.abort(); }, []);

  const cancel = (announce = true) => {
    if (!requestRef.current) return;
    requestId.current++;
    requestRef.current.abort();
    requestRef.current = null;
    setIsAsking(false);
    if (announce) setEntries(previous => [...previous, { output: "AI request canceled. Your files are still here." }].slice(-80));
  };
  const changeOpen = (next: boolean) => { if (!next) cancel(false); onOpenChange(next); };
  const append = (entry: Entry) => setEntries(previous => [...previous, entry].slice(-80));

  const execute = async (event: FormEvent) => {
    event.preventDefault();
    const raw = value.trim();
    if (!raw || isAsking) return;
    setValue(""); setHistory(previous => [...previous, raw].slice(-80)); setHistoryIndex(-1);
    const [command, ...args] = raw.split(/\s+/);
    if (command === "exit") { changeOpen(false); return; }
    if (command === "clear" || command === "reset") {
      cancel(false); aiHistory.current = []; lastReadFile.current = undefined;
      setEntries(command === "reset" ? welcome : []);
      if (command === "reset") onReset();
      return;
    }
    if (command === "ask" || command === "ai") {
      const question = args.join(" ");
      if (!question) { append({ command: raw, output: "I’m here. Try ask What has Abhirup built?\nOr: ask about his achievements, coffee, or gaming.\nAfter cat <file>, you can also ask about the file you just read." }); return; }
      const controller = new AbortController();
      requestRef.current = controller;
      const id = ++requestId.current;
      setIsAsking(true);
      append({ command: raw, output: "" });
      const timeout = window.setTimeout(() => controller.abort(), 25000);
      try {
        const result = await askTerminal(question, aiHistory.current, lastReadFile.current, controller.signal);
        if (requestId.current !== id) return;
        aiHistory.current = [...aiHistory.current, { role: "user" as const, content: question }, { role: "assistant" as const, content: result.answer }].slice(-10);
        append({ output: result.notice ? `${result.notice}\n\n${result.answer}` : result.answer, source: result.source });
      } catch {
        if (requestId.current === id) append({ output: "The AI request stopped before a reply arrived. Try again, or read the saved files with ls and cat." });
      } finally {
        window.clearTimeout(timeout);
        if (requestId.current === id) { requestRef.current = null; setIsAsking(false); inputRef.current?.focus(); }
      }
      return;
    }

    let output: string;
    switch (command) {
      case "help": output = "help            A little guidance\nls              Look around\ncat <file>      Read a file\ncontext         What this room knows\nask <question>  Talk to Abhirup’s AI\nai <question>   An alias for ask\nwhoami          Your place in this story\ndate            The time in Gurugram (IST)\nclear           A clean slate, including AI history\nexit            Back to the portfolio\nreset           Restart the clue trail\n\n↑ / ↓ history · Tab autocomplete · Esc close"; break;
      case "ls": output = Object.keys(secretFiles).join("\n"); break;
      case "cat": {
        const filename = args.join(" ").replace(/^\.\//, "");
        if (filename && Object.prototype.hasOwnProperty.call(secretFiles, filename)) { lastReadFile.current = filename; output = secretFiles[filename]; }
        else output = filename ? `No file named “${filename}”. Try ls.` : "What would you like to read? Try cat readme.txt";
        break;
      }
      case "context": output = "Public portfolio: about.txt, projects.txt, achievements.txt\nPersonal context added: coffee lover, coder, gamer (interests.txt)\nPersonal notes: not added yet (notes.txt)\n\nAI uses these files, your recent AI conversation, and the last file you read.\nIf the model is unavailable, answers use saved portfolio knowledge.\nNothing here runs real shell commands."; break;
      case "whoami": output = "visitor@between-the-lines\nSomeone who looked a little closer."; break;
      case "date": output = new Intl.DateTimeFormat("en-IN", { dateStyle: "full", timeStyle: "long", timeZone: "Asia/Kolkata" }).format(new Date()); break;
      default: output = `“${command}” is not a command in this little room. Try help, or ask <question>.`;
    }
    append({ command: raw, output });
  };

  const handleKey = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      event.preventDefault();
      const next = event.key === "ArrowUp" ? Math.min(historyIndex + 1, history.length - 1) : Math.max(historyIndex - 1, -1);
      setHistoryIndex(next); setValue(next >= 0 ? history[history.length - 1 - next] : "");
    }
    if (event.key === "Tab") {
      const isFile = value.startsWith("cat ");
      const prefix = isFile ? value.slice(4) : value;
      const matches = (isFile ? Object.keys(secretFiles) : commands).filter(item => item.startsWith(prefix));
      if (prefix && matches.length === 1) { event.preventDefault(); setValue(`${isFile ? "cat " : ""}${matches[0]}${["cat", "ask", "ai"].includes(matches[0]) ? " " : ""}`); }
    }
  };
  return <Dialog open={open} onOpenChange={changeOpen}><DialogContent className="secret-terminal" onOpenAutoFocus={event => { event.preventDefault(); inputRef.current?.focus(); }} onCloseAutoFocus={event => { event.preventDefault(); if (returnFocus?.isConnected) returnFocus.focus(); }}>
    <div className="terminal-header"><span className="status-dot" /><DialogTitle>between-the-lines</DialogTitle><button className="terminal-ai-button" disabled={isAsking} onClick={() => { setValue("ask "); inputRef.current?.focus(); }} aria-label="Ask AI in terminal"><MessageCircle size={13} /> Ask AI</button></div>
    <DialogDescription className="sr-only">A hidden interactive terminal with a portfolio AI assistant. Type help for commands, or ask followed by your question. Escape closes this window.</DialogDescription>
    <div className="terminal-output" ref={outputRef} role="log" aria-live="polite" aria-relevant="additions" tabIndex={0} aria-label="Terminal output">{entries.map((entry, index) => <div className="terminal-entry" key={index}>{entry.command && <p className="terminal-command"><span>visitor ~ $</span> {entry.command}</p>}{entry.source && <p className="terminal-answer-source">{entry.source === "ai" ? "AI · GROQ" : "SAVED PORTFOLIO KNOWLEDGE"}</p>}{entry.output && <p>{entry.output}</p>}</div>)}{isAsking && <div className="terminal-thinking" role="status"><Loader2 size={14} className="animate-spin" /><span>Thinking…</span><button onClick={() => cancel()}>Cancel</button></div>}</div>
    <form className="terminal-input-row" onSubmit={event => void execute(event)}><label htmlFor="terminal-command">visitor ~ $</label><input ref={inputRef} id="terminal-command" aria-label="Terminal command" value={value} onChange={event => setValue(event.target.value)} onKeyDown={handleKey} autoComplete="off" autoCapitalize="off" spellCheck={false} maxLength={1000} placeholder="help, ls, or ask…" readOnly={isAsking} /><button type="submit" aria-label="Run command" disabled={isAsking}>↵</button></form>
    <p className="terminal-bottom">Code, coffee & a little curiosity. <span>ESC TO RETURN</span></p>
  </DialogContent></Dialog>;
};
export default SecretTerminal;
