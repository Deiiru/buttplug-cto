import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

type MoonAnimationProps = {
  isDarkTheme: boolean;
};

export default function MoonAnimation({ isDarkTheme }: MoonAnimationProps) {
  const [showMoon, setShowMoon] = useState(false);

  useEffect(() => {
    if (isDarkTheme) {
      // Delay moon appearance slightly for smooth transition
      const timer = setTimeout(() => setShowMoon(true), 400);
      return () => clearTimeout(timer);
    } else {
      setShowMoon(false);
    }
  }, [isDarkTheme]);

  return (
    <div className="absolute top-4 left-4 pointer-events-none z-50">
      <AnimatePresence>
        {showMoon && (
          <motion.div
            key="moon"
            initial={{ x: -200, opacity: 0 }}
            animate={{ 
              x: 0,
              opacity: 1
            }}
            exit={{ x: -200, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 80,
              damping: 25,
              duration: 1.0
            }}
          >
            {/* Moon body */}
            <div className="relative">
              <motion.div
                className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 shadow-lg"
                animate={{ 
                  boxShadow: [
                    "0 0 20px rgba(229, 231, 235, 0.3), 0 0 40px rgba(229, 231, 235, 0.2), 0 0 60px rgba(229, 231, 235, 0.1)",
                    "0 0 30px rgba(229, 231, 235, 0.5), 0 0 60px rgba(229, 231, 235, 0.3), 0 0 90px rgba(229, 231, 235, 0.2)",
                    "0 0 20px rgba(229, 231, 235, 0.3), 0 0 40px rgba(229, 231, 235, 0.2), 0 0 60px rgba(229, 231, 235, 0.1)"
                  ]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                {/* Moon craters */}
                <div className="absolute top-2 left-3 w-2 h-2 rounded-full bg-gray-400 opacity-60" />
                <div className="absolute top-4 right-2 w-1 h-1 rounded-full bg-gray-400 opacity-40" />
                <div className="absolute bottom-3 left-2 w-1.5 h-1.5 rounded-full bg-gray-400 opacity-50" />
              </motion.div>
              
              {/* Moonbeams */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-0.5 bg-gray-300 opacity-60 origin-bottom"
                  style={{
                    height: '12px',
                    left: '50%',
                    top: '50%',
                    transformOrigin: '50% 32px',
                    transform: `translate(-50%, -50%) rotate(${i * 60}deg)`,
                  }}
                  animate={{
                    scaleY: [1, 1.3, 1],
                    opacity: [0.4, 0.7, 0.4]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.2
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
