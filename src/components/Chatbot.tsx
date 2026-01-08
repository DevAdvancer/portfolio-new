import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { findBestMatch } from "../data/chatbotKnowledge";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  followUp?: string[];
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hi! I'm Abhirup's assistant. Ask me anything about his skills, projects, experience, or how to contact him!",
      sender: "bot",
      timestamp: new Date(),
      followUp: [
        "Tell me about yourself",
        "What projects have you built?",
        "What are your skills?"
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputValue.trim();
    if (!textToSend) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: textToSend,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate thinking delay for more natural feel
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 500));

    // Get bot response
    const response = findBestMatch(textToSend);

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: response.answer,
      sender: "bot",
      timestamp: new Date(),
      followUp: response.followUp
    };

    setMessages(prev => [...prev, botMessage]);
    setIsTyping(false);
  };

  const handleFollowUpClick = (question: string) => {
    handleSendMessage(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 hover:shadow-primary/30"
        aria-label="Open chat"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-8rem)] bg-background border border-border rounded-lg shadow-2xl flex flex-col animate-slide-in-bottom">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-card/50">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-primary/10 border border-primary/30 rounded-full flex items-center justify-center">
                  <MessageCircle size={20} className="text-primary" />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full"></div>
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Abhirup's Assistant</h3>
                <p className="text-xs text-muted-foreground">Always here to help</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-secondary rounded transition-colors"
              aria-label="Close chat"
            >
              <X size={18} className="text-muted-foreground" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id}>
                <div
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-card border border-border text-foreground"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line leading-relaxed">{message.text}</p>
                  </div>
                </div>

                {/* Follow-up questions */}
                {message.sender === "bot" && message.followUp && message.followUp.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {message.followUp.map((question, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleFollowUpClick(question)}
                        className="text-xs px-3 py-1.5 bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground border border-border rounded-full transition-colors"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-card border border-border rounded-lg p-3 flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin text-primary" />
                  <span className="text-sm text-muted-foreground">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border bg-card/30">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                className="flex-1 px-4 py-2 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim() || isTyping}
                className="p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                aria-label="Send message"
              >
                <Send size={18} />
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Powered by local knowledge base • No external APIs
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
