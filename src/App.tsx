import { useState, useRef, useEffect, useCallback, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import GmFrog from "@/components/GmFrog";
import GMCounter from "@/components/GMCounter";
import GlobalCounter from "@/components/GlobalCounter";
import HeroDecor from "@/components/HeroDecor";
import UsernameInput from "@/components/UsernameInput";
import Leaderboard from "@/components/Leaderboard";
import GlobalLeaderboard from "@/components/GlobalLeaderboard";
import { Header } from "@/components/header-with-search";
import { ThemeProvider, useTheme } from "@/contexts/ThemeContext";
import { getGlobalClicks, incrementGlobalClicks } from "@/lib/utils";

// Lazy load heavy components
const BubbleField = lazy(() => import("@/components/BubbleField"));
const LiveMarketData = lazy(() => import("@/components/LiveMarketData"));

function AppContent() {
  const [bubbleTrigger, setBubbleTrigger] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('personalGMClicks');
      return saved ? parseInt(saved, 10) : 0;
    }
    return 0;
  });
  const [globalClicks, setGlobalClicks] = useState(() => getGlobalClicks());
  const [lastClickTime, setLastClickTime] = useState(0);
  const [username, setUsername] = useState<string>('');
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();

  // Dark theme timer - switches to dark when user stops clicking for 10 seconds
  useEffect(() => {
    if (lastClickTime === 0) return;

    const timer = setTimeout(() => {
      setTheme('dark');
    }, 10000);

    return () => clearTimeout(timer);
  }, [lastClickTime, setTheme]);


  // Load username from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedUsername = localStorage.getItem('gm-username');
      if (savedUsername) {
        setUsername(savedUsername);
      }
    }
  }, []);

  const handleGMAction = useCallback(async () => {
    const now = Date.now();
    
    // Update triggers
    setBubbleTrigger(prev => {
      const newCount = prev + 1;
      if (typeof window !== 'undefined') {
        localStorage.setItem('personalGMClicks', newCount.toString());
      }
      return newCount;
    });
    
    const newGlobalCount = incrementGlobalClicks();
    setGlobalClicks(newGlobalCount);
    setLastClickTime(now);
    
    // If user has set a username, also increment on server
    if (username) {
      try {
        await fetch('/api/click', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: username }),
        });
      } catch (error) {
        console.error('Failed to register click on server:', error);
      }
    }
    
    // Switch to light theme when clicking
    if (theme === 'dark') {
      setTheme('light');
    }
  }, [theme, setTheme, username]);

  const handleUsernameSet = useCallback((newUsername: string) => {
    setUsername(newUsername);
    localStorage.setItem('gm-username', newUsername);
  }, []);


  return (
    <>
      {/* Fixed counters - top right, smaller width */}
      <div 
        className="fixed top-24 sm:top-28 md:top-32 right-2 sm:right-3 md:right-6 z-40 space-y-1.5 md:space-y-2"
        style={{ 
          position: 'fixed',
          top: '6rem',
          right: '1rem',
          zIndex: 50,
          maxWidth: '160px',
          width: 'auto'
        }}
      >
        <GMCounter count={bubbleTrigger} />
        <GlobalCounter count={globalClicks} />
        <UsernameInput onUsernameSet={handleUsernameSet} currentUsername={username} />
        {username && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => setShowLeaderboard(true)}
            className="bg-card/85 backdrop-blur-sm border border-border rounded-md px-2 py-1.5 shadow text-xs font-medium text-foreground hover:bg-secondary transition-colors"
          >
            🏆 Leaderboard
          </motion.button>
        )}
      </div>

      <motion.div
        ref={containerRef} 
        className={`min-h-screen bg-background relative overflow-x-hidden overflow-y-scroll`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
            {/* Header with glassmorphism */}
            <div className="fixed top-0 left-0 right-0 z-50">
              <Header />
            </div>
      {/* Bubble Field for animations */}
      <Suspense fallback={null}>
        <BubbleField triggerCount={bubbleTrigger} containerRef={containerRef} />
      </Suspense>

      {/* Leaderboard Modal */}
      <Leaderboard isOpen={showLeaderboard} onClose={() => setShowLeaderboard(false)} />

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-20 pb-8 space-y-12">
        {/* Hero Section */}
        <motion.section 
          className={`text-center space-y-3 md:space-y-6 ${theme === 'light' ? 'hero-background-light' : 'hero-background-dark'} pt-2 md:pt-4 pb-4 md:pb-8 relative`}
          layout
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <HeroDecor />
          
          {/* Hero Content - Fixed layout container */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-2 md:space-y-4"
            layout
            layoutRoot
          >
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-black text-white drop-shadow-2xl relative z-10 hero-title" style={{
              filter: `
                drop-shadow(0 0 10px rgba(147, 51, 234, 0.8))
                drop-shadow(0 0 20px rgba(34, 197, 94, 0.6))
                drop-shadow(0 0 30px rgba(147, 51, 234, 0.4))
              `
            }}>
              {theme === 'dark' ? 'Night mode active' : 'Plug Power, Buttplugs'}
            </h1>
            <p className="text-sm md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto font-light tracking-wide hero-description">
              {theme === 'dark' ? 'Click me to restore buttplug power' : 'Spread plug energy across the digital universe'}
            </p>
          </motion.div>

          {/* Frog - centered under hero text, positioned higher on mobile */}
          <div className="flex justify-center -mt-2 md:mt-0">
            <GmFrog src="/Buttplugcto.png" onSmash={handleGMAction} />
          </div>

        </motion.section>


        {/* Market Data and Leaderboard */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left side - Market Data */}
          <div className="space-y-6">
            <Suspense fallback={<div className="h-48 bg-card rounded-lg border border-border animate-pulse" />}>
              <LiveMarketData />
            </Suspense>
          </div>
          
          {/* Right side - Global Leaderboard */}
          <div className="space-y-6">
            <GlobalLeaderboard globalClicks={globalClicks} />
          </div>
        </section>
      </main>

      {/* Footer */}
      <motion.footer
        className="bg-secondary/50 border-t border-border py-8 mt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left side - Brand */}
            <div className="flex items-center gap-3">
              <img 
                src="/Buttplugcto.png" 
                alt="Buttplug CTO" 
                className="w-8 h-8"
                style={{
                  filter: theme === 'dark' ? `
                    drop-shadow(0 0 6px rgba(239, 68, 68, 0.5))
                    drop-shadow(0 0 12px rgba(220, 38, 38, 0.3))
                  ` : `
                    drop-shadow(0 0 6px rgba(59, 130, 246, 0.5))
                    drop-shadow(0 0 12px rgba(37, 99, 235, 0.3))
                  `
                }}
              />
              <div>
                <p className="font-bold text-foreground">Buttplug CTO</p>
                <p className="text-sm text-muted-foreground">The most plugged-in meme coin</p>
              </div>
            </div>

            {/* Social links moved to header center; nothing here now */}
          </div>

          {/* Bottom text */}
          <div className="text-center mt-6 pt-6 border-t border-border">
            <p className="text-xs text-muted-foreground">
              © 2025 Buttplug CTO. Built with ❤️ for the plugged-in community. 
              Always DYOR and trade responsibly.
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              {theme === 'light' && '⚡ Plug Power Mode • Click the plug to power up!'}
            </p>
          </div>
        </div>
      </motion.footer>
      </motion.div>
    </>
  );
}

// Main App component with Theme Provider
function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
