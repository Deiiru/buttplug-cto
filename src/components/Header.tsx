import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ExternalLink, FileText, MessageCircle } from "lucide-react";
// Discord icon component
const DiscordIcon = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
);
import XLogo from "@/components/icons/XLogo";
import { GM_CONTRACT, BUY_NOW_URL, X_URL, X_FAMILY_URL, TELEGRAM_URL, DISCORD_URL } from "@/lib/constants";
import { copyToClipboard } from "@/lib/utils";
import Notification from "@/components/Notification";

export default function Header() {
  const [showContractNotification, setShowContractNotification] = useState(false);

  const handleContractClick = async () => {
    const success = await copyToClipboard(GM_CONTRACT);
    if (success) {
      setShowContractNotification(true);
    }
  };


  const handleBuyClick = () => {
    window.open(BUY_NOW_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.header 
      className="w-full bg-transparent absolute top-0 left-0 z-50"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-2 sm:px-4 py-1 sm:py-1.5">
        <div className="flex items-center justify-between">
          {/* Left side - Logo */}
          <motion.div 
            className="flex items-center flex-shrink-0 ml-8 sm:ml-12 md:ml-16"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-black/80 dark:bg-transparent rounded-lg p-3 border-2 border-black dark:border-transparent shadow-lg">
              <img 
                src="/Buttplugcto.png?v=1" 
                alt="Buttplug CTO Logo" 
                className="h-20 w-24 sm:h-24 sm:w-28 md:h-28 md:w-32 lg:h-32 lg:w-36 xl:h-36 xl:w-40 drop-shadow-2xl object-contain"
                style={{
                  filter: `
                    drop-shadow(0 0 10px rgba(147, 51, 234, 0.8))
                    drop-shadow(0 0 20px rgba(34, 197, 94, 0.6))
                    drop-shadow(0 0 30px rgba(147, 51, 234, 0.4))
                    drop-shadow(0 2px 8px rgba(0, 0, 0, 0.8))
                    brightness(1.2)
                    contrast(1.3)
                  `
                }}
              />
            </div>
          </motion.div>

          {/* Center - Social buttons (hidden on mobile) */}
          <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 items-center gap-2 mt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(X_URL, "_blank", "noopener,noreferrer")}
              className="flex items-center hover:bg-accent p-1.5 bg-white/90 border-black/30 shadow-lg"
              title="Follow on X"
            >
              <XLogo className="w-3 h-3" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(X_FAMILY_URL, "_blank", "noopener,noreferrer")}
              className="flex items-center hover:bg-accent p-1.5 bg-white/90 border-black/30 shadow-lg"
              title="Follow ButtPlugFamily on X"
            >
              <XLogo className="w-3.5 h-3.5" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(DISCORD_URL, "_blank", "noopener,noreferrer")}
              className="flex items-center gap-1 hover:bg-accent px-2 bg-white/90 border-black/30 shadow-lg"
              title="Join Discord"
            >
              <DiscordIcon />
              <span className="hidden md:inline text-xs">Discord</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(TELEGRAM_URL, "_blank", "noopener,noreferrer")}
              className="flex items-center gap-1 hover:bg-accent px-2 bg-white/90 border-black/30 shadow-lg"
            >
              <MessageCircle className="w-3 h-3" />
              <span className="hidden md:inline text-xs">Telegram</span>
            </Button>
          </div>

          {/* Right side - Action buttons */}
          <div className="flex items-center gap-1 sm:gap-2 mt-2">
            {/* Social buttons for mobile */}
            <div className="flex sm:hidden items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open(X_URL, "_blank", "noopener,noreferrer")}
                className="p-2"
                title="Follow on X"
              >
                <XLogo className="w-3.5 h-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open(DISCORD_URL, "_blank", "noopener,noreferrer")}
                className="p-2"
                title="Join Discord"
              >
                <DiscordIcon />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open(TELEGRAM_URL, "_blank", "noopener,noreferrer")}
                className="p-2"
                title="Join Telegram"
              >
                <MessageCircle className="w-3.5 h-3.5" />
              </Button>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleContractClick}
              className="hidden sm:flex items-center gap-1 hover:bg-accent px-2 bg-white/90 border-black/30 shadow-lg"
            >
              <FileText className="w-3 h-3" />
              <span className="hidden md:inline text-xs">Contract</span>
            </Button>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="gm"
                size="sm"
                onClick={handleBuyClick}
                className="items-center gap-1 shadow-lg hover:shadow-xl px-2 bg-gradient-to-r from-purple-600 to-green-500 text-white border-2 border-white/50"
              >
                <ExternalLink className="w-3 h-3" />
                <span className="text-xs font-bold">Buy</span>
              </Button>
            </motion.div>

            {/* Mobile contract button */}
            <div className="sm:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleContractClick}
                className="p-2"
                title="Contract Info"
              >
                <FileText className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <Notification
        message={`Contract address copied to clipboard: ${GM_CONTRACT}`}
        isVisible={showContractNotification}
        onClose={() => setShowContractNotification(false)}
        type="success"
        duration={4000}
      />
      
    </motion.header>
  );
}
