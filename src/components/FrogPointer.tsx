import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";

export default function FrogPointer() {
  const [messageIndex, setMessageIndex] = useState(0);
  const { theme } = useTheme();
  
  const lightMessages = [
    "Poke me for good vibes! 🌟",
    "Click for morning magic! ☀️",
    "Give me a tap! I'm friendly! 🐸",
    "Spread the GM energy! ✨"
  ];
  
  const darkMessages = [
    "Click me for nighttime magic! 🌙",
    "Poke me to brighten the night! ⭐",
    "Give me a tap in the darkness! 🐸",
    "Spread GM vibes even at night! 🌌"
  ];
  
  const messages = theme === 'dark' ? darkMessages : lightMessages;

  // Rotate messages every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % messages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [messages.length]);
  return (
    <div className={`absolute top-4 md:top-8 pointer-events-none z-20 ${theme === 'dark' ? '-left-56 md:-left-64' : '-left-40 md:-left-48'}`}>
      {/* Animated pointer arrow */}
      <motion.div
        className="relative"
        animate={{
          rotate: [0, -5, 5, 0],
          y: [0, -3, 3, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Speech bubble */}
        <div className="relative bg-white dark:bg-gray-800 rounded-lg px-3 py-2 shadow-lg border-2 border-purple-300 dark:border-purple-600 mb-2">
          <motion.p 
            key={messageIndex}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.3 }}
            className="text-sm font-medium text-purple-600 dark:text-purple-300 whitespace-nowrap"
          >
            {messages[messageIndex]}
          </motion.p>
          {/* Bubble tail pointing right to frog */}
          <div className="absolute top-3 -right-2 w-4 h-4 bg-white dark:bg-gray-800 border-r-2 border-t-2 border-purple-300 dark:border-purple-600 transform rotate-45"></div>
        </div>
        
        {/* Removed smaller bouncing arrow */}
      </motion.div>
      
      {/* Sparkle effects around the pointer */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-yellow-400 rounded-full"
          style={{
            top: `${20 + i * 15}px`,
            left: `${10 + i * 10}px`,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3
          }}
        />
      ))}
    </div>
  );
}
