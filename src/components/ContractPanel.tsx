import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Copy, Check, ExternalLink } from "lucide-react";
import { GM_CONTRACT, DEX_SCREENER_URL, BUY_NOW_URL, STREAMFLOW_URL } from "@/lib/constants";
import { copyToClipboard } from "@/lib/utils";

export default function ContractPanel() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(GM_CONTRACT);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDexClick = () => {
    window.open(DEX_SCREENER_URL, "_blank", "noopener,noreferrer");
  };

  const handleBuyClick = () => {
    window.open(BUY_NOW_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.div
      className="w-full max-w-4xl mx-auto bg-card rounded-2xl shadow-lg border border-border overflow-hidden"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      {/* Header */}
      <div className="bg-secondary px-6 py-4 border-b border-border">
        <h2 className="text-xl font-bold text-card-foreground terminal-header">{"> Contract & Trading"}</h2>
        <p className="text-sm text-muted-foreground terminal-text">// Trade GM tokens and view market data</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Contract Address */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-card-foreground terminal-header">Contract_Address</h3>
          <div className="flex items-center gap-3 p-4 bg-secondary rounded-lg border border-border">
            <code className="flex-1 text-sm terminal-code text-muted-foreground break-all">
              {GM_CONTRACT}
            </code>
            <motion.div whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="flex items-center gap-2 min-w-fit"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-green-600">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy</span>
                  </>
                )}
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Token Lock Verification */}
        <div className="space-y-3">
            <h3 className="text-lg font-semibold text-card-foreground terminal-header">Token_Lock_Verification</h3>
          <div className="p-4 bg-secondary rounded-lg border border-border">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 animate-pulse"></div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground terminal-text mb-2">
                  // Tokens are securely locked via Streamflow Finance
                </p>
                <p className="text-xs text-muted-foreground mb-3">
                  Verify token locks and vesting schedules on Streamflow's transparent platform
                </p>
                <motion.div whileTap={{ scale: 0.98 }}>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(STREAMFLOW_URL, "_blank", "noopener,noreferrer")}
                    className="flex items-center gap-2 text-green-400 border-green-400/30 hover:bg-green-400/10"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Verify Token Locks</span>
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* DEX Screener Embed */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-card-foreground terminal-header">Market_Data</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDexClick}
              className="flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Open in DEX</span>
            </Button>
          </div>
          
          <div className="relative w-full h-96 bg-secondary rounded-lg border border-border overflow-hidden">
            <iframe
              src={DEX_SCREENER_URL}
              className="w-full h-full border-0"
              title="DEX Screener - GM Token"
              loading="lazy"
              sandbox="allow-scripts allow-same-origin"
              onError={() => console.log("DEX iframe failed to load")}
            />
            {/* Fallback content */}
            <div className="absolute inset-0 flex items-center justify-center bg-secondary text-muted-foreground">
              <div className="text-center space-y-2">
                <p className="text-sm">Chart loading...</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDexClick}
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  View on DEX Screener
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Trading Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <motion.div
            className="flex-1"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              variant="gm"
              size="lg"
              onClick={handleBuyClick}
              className="w-full flex items-center justify-center gap-3 text-lg font-bold py-4"
            >
              <ExternalLink className="w-5 h-5" />
              Buy GM Tokens
            </Button>
          </motion.div>

          <motion.div
            className="flex-1"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              variant="outline"
              size="lg"
              onClick={handleDexClick}
              className="w-full flex items-center justify-center gap-3 text-lg py-4"
            >
              <ExternalLink className="w-5 h-5" />
              View Charts
            </Button>
          </motion.div>
        </div>

        {/* Disclaimer */}
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            <strong>Disclaimer:</strong> This is a meme token for entertainment purposes. 
            Always do your own research and never invest more than you can afford to lose. 
            Cryptocurrency trading carries significant risk.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
