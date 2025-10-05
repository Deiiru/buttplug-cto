import type { VercelRequest, VercelResponse } from '@vercel/node';
import { redis } from './redis';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    const userId = req.cookies?.uid || `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    try {
      // Increment global counter
      const globalTotal = await redis.incr('global:clicks');
      
      // Increment user counter
      const userTotal = await redis.hincrby('user:clicks', userId, 1);

      // Set cookie if new user
      if (!req.cookies?.uid) {
        res.setHeader('Set-Cookie', `uid=${userId}; Path=/; Max-Age=31536000; SameSite=Lax; HttpOnly`);
      }

      return res.status(200).json({
        globalTotal,
        userTotal,
      });
    } catch (error) {
      console.error('Redis error:', error);
      return res.status(500).json({ error: 'Failed to register click' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

