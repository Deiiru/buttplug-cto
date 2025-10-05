import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

type SunAnimationProps = {
  triggerCount: number;
  isDarkTheme: boolean;
  lastClickTime: number;
};

export default function SunAnimation({ triggerCount, isDarkTheme, lastClickTime }: SunAnimationProps) {
  const [showSun, setShowSun] = useState(false);

  // Show sun when clicking starts
  useEffect(() => {
    if (triggerCount > 0 && !isDarkTheme) {
      setShowSun(true);
    }
  }, [triggerCount, isDarkTheme]);

  // Hide sun when user stops clicking (after 2 seconds)
  useEffect(() => {
    if (!showSun || isDarkTheme) return;

    const timeout = setTimeout(() => {
      // Drop abruptly after a short delay
      setTimeout(() => {
        setShowSun(false);
      }, 300);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [lastClickTime, showSun, isDarkTheme]);

  // Clear sun when dark theme is active
  useEffect(() => {
    if (isDarkTheme) {
      setShowSun(false);
    }
  }, [isDarkTheme]);

  if (isDarkTheme) return null;

  return (
    <div className="absolute top-4 left-4 pointer-events-none z-50">
      <AnimatePresence>
        {showSun && (
          <motion.div
            key="sun"
            initial={{ x: -200, opacity: 0 }}
            animate={{ 
              x: 0,
              opacity: 1
            }}
            exit={{ x: -200, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
              duration: 0.8
            }}
          >
            {/* Cartoony Sun body */}
            <div className="relative">
              {/* Main sun circle with cartoony gradient */}
              <motion.div
                className="w-20 h-20 rounded-full shadow-lg"
                style={{
                  background: 'radial-gradient(circle at 30% 30%, #FFF176, #FFEB3B, #FF8F00)',
                  border: '3px solid #FFA000',
                }}
                animate={{ 
                  boxShadow: [
                    "0 0 20px rgba(255, 235, 59, 0.6), 0 0 40px rgba(255, 193, 7, 0.4)",
                    "0 0 30px rgba(255, 235, 59, 0.8), 0 0 60px rgba(255, 193, 7, 0.6)",
                    "0 0 20px rgba(255, 235, 59, 0.6), 0 0 40px rgba(255, 193, 7, 0.4)"
                  ]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
              </motion.div>
              
              {/* Cartoony sun rays - triangular instead of lines */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute origin-center"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: `translate(-50%, -50%) rotate(${i * 45}deg)`,
                  }}
                >
                  <motion.div
                    className="w-0 h-0 border-l-3 border-r-3 border-b-6 border-transparent border-b-yellow-400"
                    style={{
                      transform: 'translateY(-50px)',
                      borderLeftWidth: '4px',
                      borderRightWidth: '4px',
                      borderBottomWidth: '8px',
                    }}
                    animate={{
                      scale: [0.8, 1.3, 0.8],
                      opacity: [0.6, 1, 0.6]
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.2
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
