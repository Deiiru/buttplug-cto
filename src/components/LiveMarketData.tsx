import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Helper function to format large numbers
const formatNumber = (num: number): string => {
  if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
  if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";
  if (num >= 1e3) return (num / 1e3).toFixed(2) + "K";
  return num.toFixed(2);
};

type MarketData = {
  priceUsd: number;
  marketCapUsd?: number;
  volume24hUsd?: number;
  priceChange24h?: number;
  holders?: number;
  lastUpdated: number;
};

export default function LiveMarketData() {
  const [data, setData] = useState<MarketData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`https://api.dexscreener.com/latest/dex/pairs/solana/72uues3swrjrgoswxjvcaixgilpmac8fp8nwsz7s7jri`, {
        method: "GET",
        headers: { "Accept": "application/json" },
      });
      
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
      const json = await res.json();
      const pair = json?.pairs?.[0]; // Get the first trading pair
      
      if (!pair) throw new Error("No trading pair found");

      setData({
        priceUsd: Number(pair.priceUsd) || 0,
        marketCapUsd: Number(pair.marketCap) || undefined,
        volume24hUsd: Number(pair.volume?.h24) || undefined,
        priceChange24h: Number(pair.priceChange?.h24) || undefined,
        holders: undefined, // DexScreener doesn't provide holder count
        lastUpdated: Date.now(),
      });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError("Failed to fetch market data");
    }
  };

  useEffect(() => {
    fetchData();
    // Use requestIdleCallback for non-critical data updates
    const scheduleNextFetch = () => {
      setTimeout(() => {
        requestIdleCallback(() => {
          fetchData();
          scheduleNextFetch();
        });
      }, 30000);
    };
    scheduleNextFetch();
  }, []);


  return (
    <motion.div
      className="bg-card rounded-lg border border-border overflow-hidden"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="bg-secondary px-6 py-3 border-b border-border flex items-center justify-between">
        <h3 className="text-lg font-bold text-black dark:text-foreground terminal-header">Market Data</h3>
        <button className="text-xs underline text-black/80 dark:text-foreground/80 hover:text-black dark:hover:text-foreground font-medium" onClick={fetchData}>
          refresh
        </button>
      </div>

      <div className="p-6">
        {loading && (
          <p className="text-black/70 dark:text-foreground/70 text-sm font-medium">Loading live data…</p>
        )}
        {error && (
          <p className="text-red-700 dark:text-red-400 text-sm font-semibold">{error}</p>
        )}
        {!loading && !error && data && (
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-black/70 dark:text-foreground/70 text-xs font-medium">Current Price</p>
              <p className="text-2xl font-bold text-black dark:text-foreground">${data.priceUsd.toFixed(8)}</p>
              {data.priceChange24h !== undefined && (
                <p className={`text-sm font-semibold ${data.priceChange24h >= 0 ? 'text-red-400 dark:text-red-300' : 'text-red-500 dark:text-red-400'}`}>
                  {data.priceChange24h >= 0 ? '+' : ''}{data.priceChange24h.toFixed(2)}% (24h)
                </p>
              )}
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-black/70 dark:text-foreground/70 text-xs font-medium">Market Cap</p>
                <p className="text-lg font-bold text-black dark:text-foreground">{data.marketCapUsd ? `$${formatNumber(data.marketCapUsd)}` : "-"}</p>
              </div>
              <div>
                <p className="text-black/70 dark:text-foreground/70 text-xs font-medium">24h Volume</p>
                <p className="text-lg font-bold text-black dark:text-foreground">{data.volume24hUsd ? `$${formatNumber(data.volume24hUsd)}` : "-"}</p>
              </div>
              <div className="col-span-2 md:col-span-1">
                <p className="text-black/70 dark:text-foreground/70 text-xs font-medium">Holders</p>
                <p className="text-lg font-bold text-black dark:text-foreground">{data.holders ?? "-"}</p>
              </div>
            </div>
            
            <div className="pt-4 border-t border-border">
              <h4 className="text-black/70 dark:text-foreground/70 text-sm font-medium mb-3 text-center">Live Price Chart</h4>
              <div className="bg-black/5 dark:bg-white/5 rounded-lg p-2">
                <iframe
                  src={`https://dexscreener.com/solana/72uues3swrjrgoswxjvcaixgilpmac8fp8nwsz7s7jri?embed=1&theme=dark&trades=0&info=0`}
                  width="100%"
                  height="300"
                  frameBorder="0"
                  className="rounded-lg"
                  title="DexScreener Chart"
                />
              </div>
              <div className="text-center mt-2">
                <a
                  href="https://dexscreener.com/solana/72uues3swrjrgoswxjvcaixgilpmac8fp8nwsz7s7jri"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-400 dark:text-red-300 hover:text-red-500 dark:hover:text-red-200 text-xs underline font-medium"
                >
                  Open Full Chart →
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}



