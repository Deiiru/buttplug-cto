import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Check } from 'lucide-react';

interface UsernameInputProps {
  onUsernameSet: (username: string) => void;
  currentUsername?: string;
}

export default function UsernameInput({ onUsernameSet, currentUsername }: UsernameInputProps) {
  const [username, setUsername] = useState(currentUsername || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || username.length < 2) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/set-name', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: username.trim() }),
      });

      if (response.ok) {
        onUsernameSet(username.trim());
        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 2000);
      }
    } catch (error) {
      console.error('Failed to set username:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card/85 backdrop-blur-sm border border-border rounded-md p-2 shadow z-30"
    >
      <form onSubmit={handleSubmit} className="flex items-center gap-1.5">
        <User className="w-3 h-3 text-muted-foreground" />
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
          className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground text-xs border-none outline-none"
          maxLength={20}
          disabled={isSubmitting}
        />
        <motion.button
          type="submit"
          disabled={!username.trim() || username.length < 2 || isSubmitting}
          className="p-1 rounded hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isSuccess ? (
            <Check className="w-3 h-3 text-green-500" />
          ) : (
            <motion.div
              className="w-3 h-3 border-2 border-muted-foreground rounded"
              animate={isSubmitting ? { rotate: 360 } : {}}
              transition={{ duration: 1, repeat: isSubmitting ? Infinity : 0, ease: "linear" }}
            />
          )}
        </motion.button>
      </form>
    </motion.div>
  );
}
