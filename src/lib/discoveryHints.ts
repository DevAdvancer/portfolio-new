import type { ChatResponse } from "@/data/chatbotKnowledge";

// Hints stay local and use actual discovery progress. They never unlock a clue.
export const getDiscoveryHint = (message: string, step: number): ChatResponse | null => {
  const explicitPortfolio = /portfolio|this (?:site|website)|desk (?:notes?|paper)|footnote|margin note|breathing room|clue trail|anomaly/i.test(message);
  if (/\b(?:game|boss|level|zelda|elden ring|minecraft)\b/i.test(message) && !explicitPortfolio) return null;
  const siteClue = /easter\s*eggs?|(?:hidden|secret)\s+(?:room|terminal)|desk (?:notes?|paper)|footnote|margin note|breathing room|clue trail|anomaly|(?:hints?|clues?).*(?:portfolio|this site|this website)|(?:portfolio|this site|this website).*(?:hints?|clues?)/i.test(message);
  const quickHint = /^(?:(?:can|could) i (?:have|get) |(?:give|show) me )?(?:a |another )?(?:small |little )?(?:hint|clue)(?: for (?:the|this) riddle)?[?!. ]*$/i.test(message.trim());
  const currentPuzzle = step === 1 && /^(?:(?:i(?:'m|’m| am)?\s+)?(?:stuck(?: with| on)?|need help with)\s+(?:the|this)\s+riddle[?.! ]*(?:a hint[?.! ]*)?|(?:a )?hint for (?:the|this) riddle[?.! ]*)$/i.test(message.trim());
  if (!siteClue && !quickHint && !currentPuzzle) return null;
  if (step >= 3) return { answer: "You found the little room, bro :) The bracketed footnote at the bottom takes you back. Try help, ls, or ask <question> inside—curiosity does get rewarded around here." };
  if (step === 2) return { answer: "You’ve done the thinking. Now follow the story all the way to its last line. There’s a tiny bit of punctuation in the footer that doesn’t quite belong. Give it a closer look." };
  if (step === 1) {
    if (/riddle|answer|space|keyboard|breathing|thumb|word|stuck/i.test(message)) return { answer: "For the margin note, think about what separates two words when you type. It’s something your thumbs probably know better than you do. You can type your guess into the note." };
    return { answer: "That first little mark has a twin. Look beside the heading of Abhirup’s story, where he talks about his small-town roots. It has a small question for you.", followUp: ["A hint for the riddle?"] };
  }
  return { answer: "Start with the desk notes near the top. One little mark has wandered off the paper—apparently even punctuation has side quests. Look around the edges. The full stop after my name has a nudge too :)" };
};
