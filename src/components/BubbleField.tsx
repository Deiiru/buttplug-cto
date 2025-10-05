import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { getRandomPosition, generateId } from "@/lib/utils";
import { MAX_BUBBLES } from "@/lib/constants";

type Bubble = {
  id: string;
  x: number;
  y: number;
  delay: number;
};

type BubbleFieldProps = {
  triggerCount: number;
  containerRef: React.RefObject<HTMLDivElement>;
};

export default function BubbleField({ triggerCount, containerRef }: BubbleFieldProps) {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    if (triggerCount === 0) return;

    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const newBubbles: Bubble[] = [];
    
    // Create 3-5 bubbles per trigger
    const bubbleCount = Math.floor(Math.random() * 3) + 3;
    
    for (let i = 0; i < bubbleCount; i++) {
      const position = getRandomPosition(rect.width - 100, rect.height - 100);
      newBubbles.push({
        id: generateId(),
        x: position.x,
        y: position.y,
        delay: i * 0.1,
      });
    }

    setBubbles(prev => {
      const updated = [...prev, ...newBubbles];
      // Keep only the latest MAX_BUBBLES
      return updated.slice(-MAX_BUBBLES);
    });

    // Clean up bubbles after animation
    const timeout = setTimeout(() => {
      setBubbles(prev => 
        prev.filter(bubble => !newBubbles.some(newBubble => newBubble.id === bubble.id))
      );
    }, 3000);

    return () => clearTimeout(timeout);
  }, [triggerCount, containerRef]);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      <AnimatePresence>
        {bubbles.map((bubble) => (
          <motion.div
            key={bubble.id}
            initial={{ 
              x: bubble.x, 
              y: bubble.y, 
              scale: 0.8, 
              opacity: 0.8,
              rotate: Math.random() * 20 - 10
            }}
            animate={{ 
              y: bubble.y - 150, 
              scale: 1.2, 
              opacity: 0,
              rotate: Math.random() * 40 - 20
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 3, 
              delay: bubble.delay,
              ease: "easeOut" 
            }}
            className="absolute select-none"
          >
            <img 
              src="/bp.png" 
              alt="BP" 
              className="w-16 h-16 md:w-20 md:h-20 drop-shadow-2xl"
              style={{
                filter: `
                  drop-shadow(0 0 15px rgba(239, 68, 68, 0.9))
                  drop-shadow(0 0 30px rgba(220, 38, 38, 0.7))
                  drop-shadow(0 0 45px rgba(185, 28, 28, 0.5))
                  drop-shadow(0 0 60px rgba(153, 27, 27, 0.3))
                `
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
