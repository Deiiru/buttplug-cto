import { motion } from "framer-motion";
import { Lock, ExternalLink, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { STREAMFLOW_URL_1, STREAMFLOW_URL_2, STREAMFLOW_URL_3 } from "@/lib/constants";

export default function TokenLockAnnouncement() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-card rounded-lg border border-border overflow-hidden mb-6"
    >
      {/* Header */}
      <div className="bg-secondary px-6 py-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-500" />
            <Lock className="w-5 h-5 text-green-500" />
          </div>
          <h2 className="text-xl font-bold text-black dark:text-foreground terminal-header">
            Token_Lock_Security
          </h2>
          <div className="ml-auto">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-500 font-semibold">SECURED</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start gap-4">
          {/* Lock Icon with Animation */}
          <motion.div
            className="flex-shrink-0"
            animate={{ 
              rotate: [0, -5, 5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
              <Lock className="w-6 h-6 text-green-500" />
            </div>
          </motion.div>

          {/* Content */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-black dark:text-foreground terminal-header mb-2">
              🎄 Developer Token Lock Until Christmas
            </h3>
            
            <div className="space-y-3">
              <p className="text-black dark:text-foreground/80 terminal-text font-medium">
                // Developer has locked 13% of total supply until Christmas 🎅
              </p>
              
              <div className="bg-background rounded border border-border p-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                  <div>
                    <p className="text-black/70 dark:text-foreground/70 terminal-text font-medium">Locked Amount</p>
                    <p className="font-bold text-green-700 dark:text-green-400 terminal-code">13% of Supply</p>
                  </div>
                  <div>
                    <p className="text-black/70 dark:text-foreground/70 terminal-text font-medium">Lock Duration</p>
                    <p className="font-bold text-orange-700 dark:text-orange-400 terminal-code">Until Christmas 🎄</p>
                  </div>
                  <div>
                    <p className="text-black/70 dark:text-foreground/70 terminal-text font-medium">Security</p>
                    <p className="font-bold text-blue-700 dark:text-blue-400 terminal-code">Streamflow Verified</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  { num: 1, url: STREAMFLOW_URL_1 },
                  { num: 2, url: STREAMFLOW_URL_2 },
                  { num: 3, url: STREAMFLOW_URL_3 }
                ].map(({ num, url }) => (
                  <motion.div key={num} whileTap={{ scale: 0.98 }}>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(url, "_blank", "noopener,noreferrer")}
                      className="w-full flex items-center gap-1.5 md:gap-2 text-black dark:text-green-400 border-green-400/30 hover:bg-green-400/10 px-2 md:px-3 py-2 md:py-2.5 min-h-[40px] md:min-h-[44px]"
                    >
                      <span className="bg-green-400/20 text-black dark:text-green-400 rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {num}
                      </span>
                      <ExternalLink className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                      <span className="text-xs md:text-sm font-medium truncate">
                        <span className="hidden sm:inline">Verify Lock on Streamflow</span>
                        <span className="sm:hidden">Verify Lock {num}</span>
                      </span>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
