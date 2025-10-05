import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Crown, Medal, Users } from 'lucide-react';

interface LeaderboardEntry {
  id: string;
  name: string;
  total: number;
}

interface GlobalLeaderboardProps {
  globalClicks: number;
}

export default function GlobalLeaderboard({ globalClicks }: GlobalLeaderboardProps) {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Placeholder data for when API fails
  const placeholderData: LeaderboardEntry[] = [
    { id: '1', name: 'PlugMaster', total: 15420 },
    { id: '2', name: 'ButtplugKing', total: 12850 },
    { id: '3', name: 'CTO_Hunter', total: 11200 },
    { id: '4', name: 'RedGlow', total: 9850 },
    { id: '5', name: 'ClickChamp', total: 8750 },
    { id: '6', name: 'PowerUser', total: 7200 },
    { id: '7', name: 'GlowMaster', total: 6800 },
    { id: '8', name: 'ClickBot', total: 5400 },
    { id: '9', name: 'RedEnergy', total: 4200 },
    { id: '10', name: 'PlugFan', total: 3500 }
  ];

  const fetchLeaderboard = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/stats');
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.leaderboard && data.leaderboard.length > 0) {
        setLeaderboard(data.leaderboard);
        setError(null);
      } else {
        // Use placeholder data if API returns empty
        setLeaderboard(placeholderData);
        setError('Using sample data - No leaderboard data yet');
      }
    } catch (err) {
      console.log('API failed, using placeholder data:', err);
      setLeaderboard(placeholderData);
      setError('Using sample data - API will work in production');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
    // Refresh every 30 seconds
    const interval = setInterval(fetchLeaderboard, 30000);
    return () => clearInterval(interval);
  }, []);

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Crown className="w-4 h-4 text-yellow-500" />;
      case 1:
        return <Trophy className="w-4 h-4 text-gray-400" />;
      case 2:
        return <Medal className="w-4 h-4 text-amber-600" />;
      default:
        return <span className="w-4 h-4 flex items-center justify-center text-muted-foreground text-xs font-bold">
          {index + 1}
        </span>;
    }
  };

  const getRankColor = (index: number) => {
    switch (index) {
      case 0:
        return 'text-yellow-500';
      case 1:
        return 'text-gray-400';
      case 2:
        return 'text-amber-600';
      default:
        return 'text-foreground';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="bg-card/85 backdrop-blur-sm border border-border rounded-lg p-4 shadow-lg"
    >
      <div className="flex items-center gap-2 mb-4">
        <Users className="w-5 h-5 text-red-400" />
        <h3 className="text-lg font-bold text-foreground">Global Clicks Leaderboard</h3>
      </div>

      <div className="mb-4 p-3 bg-secondary/50 rounded-lg">
        <div className="text-center">
          <p className="text-2xl font-bold text-red-400">{globalClicks.toLocaleString()}</p>
          <p className="text-sm text-muted-foreground">Total Global Clicks</p>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-4">
          <div className="animate-spin w-6 h-6 border-2 border-red-500 border-t-transparent rounded-full mx-auto mb-2"></div>
          <p className="text-muted-foreground text-sm">Loading...</p>
        </div>
      ) : error ? (
        <div className="text-center py-4">
          <p className="text-red-500 text-sm mb-2">{error}</p>
          <button
            onClick={fetchLeaderboard}
            className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition-colors"
          >
            Retry
          </button>
        </div>
      ) : (
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {leaderboard.slice(0, 10).map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-2 p-2 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
            >
              {getRankIcon(index)}
              <div className="flex-1 min-w-0">
                <p className={`font-medium text-sm truncate ${getRankColor(index)}`}>
                  {entry.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {entry.total.toLocaleString()} clicks
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-foreground">
                  #{index + 1}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <div className="mt-4 pt-3 border-t border-border text-center">
        <p className="text-xs text-muted-foreground">
          {error ? 'Sample data shown - Real leaderboard will work in production with Redis' : 'Set your username to join the leaderboard!'}
        </p>
      </div>
    </motion.div>
  );
}
