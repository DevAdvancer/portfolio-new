import { findBestMatch, type ChatResponse } from "@/data/chatbotKnowledge";
import { projects } from "@/data/projects";
import { achievements } from "@/data/achievements";

export const isPersonalQuestion = (text: string): boolean => {
  if (/^(?:your )?(?:skills|projects|experience|education|achievements|certifications|hobbies|interests|coffee or tea|tea or coffee)[?!. ]*$/i.test(text.trim())) return true;
  return /\b(?:abhirup(?:[’']s)?|your|his)\s+(?:favou?rite|games?|gaming|hobbies|interests|coffee|skills|projects|experience|education|achievements|certifications|work|job|contact|resume|résumé|personality|background)\b|\b(?:who is|about|hire|contact|reach)\s+abhirup\b|\b(?:does|is|has|can)\s+abhirup\b|\b(?:who are you|about yourself|about you|what do you do|what are you working on|what have you built)\b|\b(?:what|which)\s+games?\s+do\s+you\s+play\b|\b(?:are you|do you|you a)\s+(?:a\s+)?(?:gamer|coder|developer|coffee person|drink coffee|like coffee|play games)\b|\b(?:your|his)\s+(?:email|github|linkedin)\b/i.test(text);
};

export function getLocalConversationReply(question: string): ChatResponse {
  const text = question.trim();
  if (/^(?:hi|hey|hello|yo|sup)(?:\s+(?:bro|dude))?[!. :)]*$/i.test(text)) return { answer: "Hey bro :) Code, coffee, games—or something completely different. What’s on your mind?", followUp: ["What’s an RPG?", "What have you built?"] };
  if (/^(?:thanks?|thank you|cheers)(?:\s+(?:bro|dude))?[!. :)]*$/i.test(text)) return { answer: "Anytime, bro. One less mystery on the internet :)" };

  if (isPersonalQuestion(text)) {
    if (/games?|gaming|gamer/i.test(text)) return { answer: "Yep, I’m a gamer as well as a coder. My actual game list and ranks aren’t on the site yet, though—no fake gamer lore today :)", followUp: ["What’s an RPG?", "What have you built?"] };
    if (/coffee|tea|chai/i.test(text)) return { answer: "Coffee. Very much coffee, bro. Coder, gamer, coffee person—that’s the lineup. My exact order hasn’t made it onto the site yet :)" };
    if (/hobbies|interests/i.test(text)) return { answer: "Code, games, and coffee. The editor gets a turn, the controller gets a turn, and the coffee rarely gets a break. Specific favorites and stories are still waiting for me to add them." };
    if (/projects|built|working on/i.test(text)) return { answer: `I like building things that do something useful. A few examples:\n\n${["4", "1", "7"].map(id => projects.find(project => project.id === id)!).map(project => `• ${project.title}: ${project.problem}`).join("\n\n")}\n\nDifferent rabbit holes, same curiosity.`, followUp: ["What are your skills?", "What are your achievements?"] };
    if (/achievements|certificat|awards?/i.test(text)) return { answer: `A few checkpoints I’m proud of:\n\n${achievements.map(item => `• ${item.title} — ${item.issuer}, ${item.date}`).join("\n")}\n\nStill learning. The list isn’t the finish line.` };
    if (/who are you|about (?:you|yourself|abhirup)|who is abhirup/i.test(text)) return { answer: "I’m Abhirup—a software developer from near Kolkata. I build web apps, get curious about the systems underneath, and game when I’m away from the editor. Coffee is very much part of the arrangement :)" };
    if (/skills/i.test(text)) return { answer: "My toolkit includes TypeScript, React, Next.js, Node.js, Python, Supabase, Linux, and Rust. I care more about making the thing work well than turning the stack into a shopping list. Tell me what you’re trying to build, and we can get specific." };
    return findBestMatch(text);
  }

  // Small, evergreen saved answers make the disconnected preview useful too.
  // Open-ended and current-world answers come from the existing live model.
  if (/\bRPGs?\b|role.playing game/i.test(text)) return { answer: "An RPG is a role-playing game: you develop a character, make choices, and usually get stronger as a story unfolds. Think skills, quests, and character progression. Basically, character development—with considerably more loot.", followUp: ["How is that different from an FPS?", "What makes a good game story?"] };
  if (/\bFPS\b|first.person shooter|frame(?:s)? per second/i.test(text)) return { answer: "FPS can mean two things in gaming: a first-person shooter, or frames per second. One describes the kind of game; the other describes how many frames are displayed each second. Same three letters, very different conversations—classic naming efficiency lol." };
  if (/(?:what|explain|define).*\bAPI\b/i.test(text)) return { answer: "An API is an agreed way for two pieces of software to communicate. For example, a weather app asks a service for a forecast, and the service sends data back in the expected format. The nice part: neither side needs a guided tour of the other’s entire codebase." };
  if (/espresso|cold brew/i.test(text)) return { answer: "Espresso is brewed by pushing hot water through finely ground coffee under pressure. Cold brew steeps coffee in cool water over a much longer time. Different methods, different cups—both perfectly capable of accompanying a suspiciously long debugging session." };
  if (/(?:recommend|suggest).*(?:games?|play)|games?.*(?:recommend|suggest)|should i play|what to play|good games|best games/i.test(text)) return { answer: "Bro, give me two things: your platform, and the mood—story, competitive, or something chill? That’s much more useful than throwing a random ‘top ten’ at you. My live chat is unavailable right now, so I can’t give you a current shortlist from here." };
  if (/what makes.*(?:game|story)|game.*story/i.test(text)) return { answer: "A good game story gives your choices weight: clear motives, characters you care about, and consequences you can actually feel through play. The strongest moments make you do something meaningful, rather than stopping everything to explain why it matters. A cutscene can help; it shouldn’t need to carry the whole squad." };
  if (/joke|make me laugh/i.test(text)) return { answer: "My code worked on the first try.\n\nThat’s the joke. I checked the wrong tab :)" };
  if (/latest|current|today|price|release date|score/i.test(text)) return { answer: "I can’t check live updates from this chat, bro, so I won’t invent a date, price, or score and call it confidence. I can still help explain the topic or work through details you bring." };
  return { answer: "Bro, we can absolutely go beyond the portfolio. My live AI isn’t connected right now, though, and I don’t have a reliable saved answer for that one. I’d rather say that than freestyle a fact :)" };
}
