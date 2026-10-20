import type { ChatResponse } from "@/data/chatbotKnowledge";

// Saved replies cover common social questions when the live provider is unavailable.
// Specific intent matters: a JavaScript Date or a date format is not an invitation.
export function getSocialConversationReply(question: string): ChatResponse | null {
  const text = question.trim().replace(/[’‘]/g, "'");
  const age = text.match(/\b(?:i'm|i am|im|my age is)\s+(\d{1,2})\b/i)?.[1];
  const friendlyOnly = age && Number(age) < 18;
  const friendlyReply = { answer: "Happy to chat about games, school, projects, or what’s on your mind. Let’s keep this friendly :)" };
  if (/\b(?:are you|r u)\s+(?:(?:really|actually|the real|a|an)\s+)*(?:ai|a bot|bot|human|automated|abhirup|real person)\b|\b(?:is this|am i (?:talking|speaking) to)\s+(?:(?:really|actually|the real|an?|automated)\s+)*(?:ai|bot|abhirup|real person)\b|\b(?:who is|who's|is abhirup)\s+(?:actually\s+)?typing\b|\b(?:pretend|claim|say)\b.*\b(?:not (?:an? )?(?:ai|bot)|(?:the )?real abhirup)\b/i.test(text)) {
    return { answer: "You’re chatting with Abhirup’s portfolio assistant, not Abhirup typing live. For a direct conversation, say hello through /contact. Still happy to help with what’s on your mind :)" };
  }
  if (/\b(?:kill myself|end my life|want to die|suicid(?:e|al)|hurt myself)\b/i.test(text)) {
    return { answer: "I’m sorry you’re hurting. If you might act on this now or you’ve already hurt yourself, contact local emergency services or go to the nearest emergency department. Move away from anything you could use to hurt yourself and ask someone you trust to stay with you. Are you safe right now?" };
  }
  if (/\b(?:break[ -]?up|broke up|heartbroken|got dumped|(?:partner|girlfriend|boyfriend) left me)\b/i.test(text)) {
    return { answer: "That hurts, and you don’t have to solve the whole feeling today. Give yourself some space before texting again, eat something, and reach out to someone you trust. If you want, tell me what happened—we can work out the next step without making a permanent decision on a painful day." };
  }
  if (/\b(?:i(?:'m| am| feel|'ve been feeling) (?:really |so |very )?(?:lonely|alone|sad|overwhelmed)|feeling (?:really |so |very )?(?:lonely|alone)|no one cares about me)\b/i.test(text)) {
    return { answer: "That sounds hard. Could you message someone you trust today and say you could use a little company? You don’t need a polished explanation. If you want to talk here, what’s been weighing on you most?" };
  }
  if (/\b(?:can|could|shall|should)\s+(?:we|you and i)\s+(?:go (?:out )?(?:on |for )?(?:a )?date|go out|(?:get|grab|have) (?:a )?(?:coffee|dinner|drink))\b|\b(?:would|will|wanna|want to|can you)\s+(?:you\s+)?(?:date me|go out with me|(?:get|grab|have) (?:a )?(?:coffee|dinner|drink) with me)\b|\b(?:let's|lets)\s+(?:go (?:out )?on a date|go out|(?:grab|get) coffee)\b|\b(?:can i|let me|i want to)\s+(?:take you out|date you|ask you out)\b/i.test(text)) {
    if (friendlyOnly) return friendlyReply;
    return { answer: "Coffee is a strong opening argument :) Say hello through /contact; actual plans need a direct conversation. Bonus points for an opening line better than ‘hey.’" };
  }
  if (/\b(?:marry me|will you be my (?:girlfriend|boyfriend|partner)|be (?:my )?(?:girlfriend|boyfriend))\b/i.test(text)) {
    if (friendlyOnly) return friendlyReply;
    return { answer: "Straight to the wedding playlist? At least let the coffee have its first date :) Start with a hello through /contact; big decisions need a real conversation." };
  }
  if (/\b(?:i love you|you're (?:cute|handsome)|you are (?:cute|handsome)|i have a crush on you)\b/i.test(text)) {
    if (friendlyOnly) return friendlyReply;
    return { answer: "Well, that’s a much nicer notification than ‘build failed’ :) Thanks for the sweet words. If you want to get to know me, say hello through /contact." };
  }
  if (/\b(?:friend|crush|someone|they|she|he)\b.*\b(?:ghost(?:ed|ing)?|stopped (?:replying|texting)|(?:won't|doesn't|not) (?:reply|text)|left me on read)\b|\b(?:being|got) ghosted\b/i.test(text)) {
    return { answer: "Try one low-pressure message: ‘Hey, hope you’re doing okay. Want to catch up sometime?’ Then give them space. No need to turn the read receipt into a detective series; repeated messages won’t create a better conversation." };
  }
  if (/\b(?:nervous|anxious|scared|panic(?:king)?)\b.*\b(?:interview|exam|test|presentation)\b|\b(?:interview|exam|test|presentation)\b.*\b(?:nervous|anxious|scared|panic(?:king)?)\b/i.test(text)) {
    return { answer: "Your brain has apparently scheduled the panic early. Pick three things to prepare, practise explaining them out loud, and get some sleep. What’s coming up—an interview, an exam, or a presentation? We can make the preparation smaller and more manageable." };
  }
  if (/\b(?:procrastinat(?:e|ing|ion)|can't focus|cannot focus|keep putting (?:it|things) off)\b/i.test(text)) {
    return { answer: "Make the first step almost annoyingly small: open the document, write one rough sentence, or work for five minutes. Put your phone out of reach and start before you negotiate another treaty with the snooze button. What’s the task you’re avoiding?" };
  }
  return null;
}
