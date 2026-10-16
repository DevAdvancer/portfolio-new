import type { ChatResponse } from "@/data/chatbotKnowledge";

// Hints stay local and use actual discovery progress. They never unlock a clue.
export const getDiscoveryHint = (message: string, step: number): ChatResponse | null => {
  if (!/\b(hints?|clues?|easter\s*eggs?|hidden|secrets?|riddle|stuck|breathing room|surprises?)\b|(?:where|how).*(?:footnote|anomaly|terminal)/i.test(message)) return null;
  if (step >= 3) return { answer: "You found the little room! The bracketed footnote at the bottom will take you back. Inside, try help, ls, or cat readme.txt. There are a few pages waiting for Abhirup’s own stories." };
  if (step === 2) return { answer: "You’ve done the thinking. Now follow the story all the way to its last line. There’s a tiny bit of punctuation in the footer that doesn’t quite belong. Give it a closer look." };
  if (step === 1) {
    if (/riddle|answer|space|keyboard|breathing|thumb|word|stuck/i.test(message)) return { answer: "For the margin note, think about what separates two words when you type. It’s something your thumbs probably know better than you do. You can type your guess into the note." };
    return { answer: "That first little mark has a twin. Look beside the heading of Abhirup’s story, where he talks about his small-town roots. It has a small question for you.", followUp: ["A hint for the riddle?"] };
  }
  return { answer: "Start with the notes from Abhirup’s desk near the top. One little mark has wandered outside the paper. Look around its edges. The full stop after his name has a nudge too, if you’re curious." };
};
