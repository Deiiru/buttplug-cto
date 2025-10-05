import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { validateGMInput, sanitizeText, generateId } from "@/lib/utils";
import { MAX_CHAT_MESSAGES, MAX_MESSAGE_LENGTH } from "@/lib/constants";

type ChatMessage = {
  id: string;
  text: string;
  timestamp: number;
  user: string;
};

type GMChatProps = {
  onMessageSent?: () => void;
};

export default function GMChat({ onMessageSent }: GMChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load messages from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("gm-chat-messages");
      if (saved) {
        const parsedMessages = JSON.parse(saved);
        setMessages(parsedMessages.slice(-50)); // Keep only last 50
      }
    } catch (error) {
      console.error("Failed to load chat messages:", error);
    }
  }, []);

  // Save messages to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      try {
        localStorage.setItem("gm-chat-messages", JSON.stringify(messages));
      } catch (error) {
        console.error("Failed to save chat messages:", error);
      }
    }
  }, [messages]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Prevent input of non-letter characters (except spaces)
    const sanitized = value.replace(/[^a-zA-Z\s]/g, '');
    
    if (sanitized.length <= MAX_MESSAGE_LENGTH) {
      setInputValue(sanitized);
      setIsValid(validateGMInput(sanitized));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isValid || !inputValue.trim()) return;

    const sanitizedText = sanitizeText(inputValue);
    const newMessage: ChatMessage = {
      id: generateId(),
      text: sanitizedText,
      timestamp: Date.now(),
      user: "Anonymous", // Could be expanded to include user names
    };

    setMessages(prev => {
      const updated = [...prev, newMessage];
      // Keep only the latest MAX_CHAT_MESSAGES
      return updated.slice(-MAX_CHAT_MESSAGES);
    });

    setInputValue("");
    setIsValid(false);
    onMessageSent?.();
  };

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="w-full max-w-md mx-auto bg-card border-2 border-border rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-secondary px-4 py-3 border-b border-border">
        <h3 className="font-bold text-card-foreground">GM Chat</h3>
        <p className="text-xs text-muted-foreground">Say GM to the world!</p>
      </div>

      {/* Messages */}
      <div className="h-64 overflow-y-auto p-4 space-y-2 bg-secondary/50">
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-card rounded-lg p-3 shadow-sm border border-border"
            >
              <div className="flex justify-between items-start gap-2">
                <p className="text-sm font-medium text-card-foreground flex-1">
                  {message.text}
                </p>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {formatTimestamp(message.timestamp)}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {messages.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p className="text-sm">No messages yet...</p>
            <p className="text-xs">Be the first to say GM!</p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 bg-card border-t border-border">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Type GM message..."
            className={`flex-1 ${isValid ? 'border-gm-green' : 'border-border'}`}
            maxLength={MAX_MESSAGE_LENGTH}
            autoComplete="off"
          />
          <Button
            type="submit"
            size="sm"
            variant={isValid ? "gm" : "outline"}
            disabled={!isValid}
            className="px-3"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex justify-between items-center mt-2">
          <p className="text-xs text-muted-foreground">
            Must contain "GM" • Letters only • Max {MAX_MESSAGE_LENGTH} chars
          </p>
          <span className={`text-xs ${inputValue.length > MAX_MESSAGE_LENGTH * 0.8 ? 'text-red-500' : 'text-muted-foreground'}`}>
            {inputValue.length}/{MAX_MESSAGE_LENGTH}
          </span>
        </div>
      </form>
    </div>
  );
}
