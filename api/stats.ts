import type { VercelRequest, VercelResponse } from '@vercel/node';
import { redis } from './redis';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    const userId = req.cookies?.uid;
    
    try {
      // Get global total
      const globalTotal = await redis.get<number>('global:clicks') || 0;
      
      // Get user total
      let userTotal = 0;
      if (userId) {
        userTotal = await redis.hget<number>('user:clicks', userId) || 0;
      }
      
      // Get all user clicks for leaderboard
      const allUserClicks = await redis.hgetall<Record<string, number>>('user:clicks') || {};
      
      // Get user names
      const userNames = await redis.hgetall<Record<string, string>>('user:names') || {};
      
      // Build leaderboard
      const leaderboard = Object.entries(allUserClicks)
        .map(([id, clicks]) => ({
          id,
          name: userNames[id] || 'Anonymous',
          clicks: Number(clicks),
        }))
        .sort((a, b) => b.clicks - a.clicks)
        .slice(0, 10);

      return res.status(200).json({
        globalTotal,
        userTotal,
        leaderboard,
      });
    } catch (error) {
      console.error('Redis error:', error);
      return res.status(500).json({ error: 'Failed to get stats' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

