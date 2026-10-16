import { useState, useRef, useEffect, type FormEvent, type KeyboardEvent } from "react";
import { MessageCircle, X, ArrowUp, Loader2, Minus } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { chatWithGroq, isGroqAvailable } from "@/lib/groq";
import { findBestMatch } from "@/data/chatbotKnowledge";
import { getDiscoveryHint } from "@/lib/discoveryHints";
import { useExploration } from "@/hooks/use-exploration";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  followUp?: string[];
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{
    id: "welcome",
    text: "Hey, I’m Abhirup’s AI assistant. Code, coffee, games, or projects? I can show you around—and offer a small hint if you get stuck exploring.",
    sender: "bot",
    followUp: ["What does Abhirup build?", "Coffee or tea?", "A small hint?"],
  }]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [localReply, setLocalReply] = useState(!isGroqAvailable());
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const reducedMotion = useReducedMotion();
  const { step } = useExploration();

  useEffect(() => {
    if (outputRef.current) outputRef.current.scrollTo({ top: outputRef.current.scrollHeight, behavior: reducedMotion ? "instant" : "smooth" });
  }, [messages, isTyping, reducedMotion]);
  useEffect(() => { if (isOpen) inputRef.current?.focus(); }, [isOpen]);
  const close = () => { setIsOpen(false); triggerRef.current?.focus(); };

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = (messageText || inputValue).trim();
    if (!textToSend || isTyping) return;
    const history = messages.filter(message => message.id !== "welcome").map(message => ({
      role: message.sender === "user" ? "user" as const : "assistant" as const,
      content: message.text,
    }));
    setMessages(previous => [...previous, { id: crypto.randomUUID(), text: textToSend, sender: "user" }]);
    setInputValue("");
    setIsTyping(true);
    try {
      const hint = getDiscoveryHint(textToSend, step);
      let response;
      if (hint) {
        response = hint;
      } else if (isGroqAvailable()) {
        try { response = await chatWithGroq(textToSend, history); setLocalReply(false); }
        catch { response = findBestMatch(textToSend); setLocalReply(true); }
      } else {
        response = findBestMatch(textToSend); setLocalReply(true);
      }
      setMessages(previous => [...previous, { id: crypto.randomUUID(), text: response.answer, sender: "bot", followUp: response.followUp }]);
    } finally {
      setIsTyping(false);
      inputRef.current?.focus();
    }
  };
  const submit = (event: FormEvent) => { event.preventDefault(); void handleSendMessage(); };
  const keyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Escape") { event.stopPropagation(); close(); }
  };
  return <>
    <button ref={triggerRef} type="button" className="assistant-launcher" onClick={() => isOpen ? close() : setIsOpen(true)} aria-label={isOpen ? "Minimize AI assistant" : "Open Abhirup’s AI assistant"} aria-expanded={isOpen} aria-controls="portfolio-assistant">
      {isOpen ? <Minus size={17} /> : <MessageCircle size={17} />}<span>{isOpen ? "Back to exploring" : "Ask my AI"}</span><span className="status-dot" />
    </button>
    {isOpen && <section id="portfolio-assistant" className="assistant-panel" role="dialog" aria-modal="false" aria-label="Abhirup’s AI assistant" onKeyDown={keyDown}>
      <header className="assistant-header"><div><h2>Abhirup Kumar</h2></div><button onClick={close} aria-label="Close AI assistant"><X size={18} /></button></header>
      <div className="assistant-conversation" ref={outputRef} role="log" aria-label="Conversation" aria-live="polite" aria-relevant="additions" tabIndex={0}>
        {messages.map((message, index) => <div key={message.id} className={`assistant-message ${message.sender === "user" ? "from-visitor" : "from-assistant"}`}>
          <p className="message-author">{message.sender === "user" ? "YOU" : "AK / ASSISTANT"}</p>
          <p className="message-copy">{message.text}</p>
          {message.sender === "bot" && message.followUp?.length > 0 && index === messages.length - 1 && <div className="assistant-suggestions">{message.followUp.map(question => <button type="button" key={question} onClick={() => void handleSendMessage(question)} disabled={isTyping}>{question} ↗</button>)}</div>}
        </div>)}
        {isTyping && <p className="assistant-thinking" role="status"><Loader2 size={14} className="animate-spin" /> One moment…</p>}
      </div>
      <form className="assistant-composer" onSubmit={submit}><label className="sr-only" htmlFor="assistant-message">Message to Abhirup’s AI assistant</label><input id="assistant-message" ref={inputRef} value={inputValue} onChange={event => setInputValue(event.target.value)} maxLength={1000} placeholder="A question, a thought, a hint…" autoComplete="off" /><button type="submit" disabled={!inputValue.trim() || isTyping} aria-label="Send message"><ArrowUp size={18} /></button></form>
      <p className="assistant-small-print">{localReply ? "Using saved portfolio knowledge." : "AI can get things wrong. Ask Abhirup for the details."}</p>
    </section>}
  </>;
};
export default Chatbot;
