import type { VercelRequest, VercelResponse } from '@vercel/node';
import { redis } from './redis';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    const userId = req.cookies?.uid;
    const { name } = req.body;

    if (!userId) {
      return res.status(401).json({ error: 'No user ID' });
    }

    if (!name || typeof name !== 'string' || name.length > 20 || name.length < 1) {
      return res.status(400).json({ error: 'Invalid name (1-20 characters)' });
    }

    try {
      // Store user name in Redis
      await redis.hset('user:names', { [userId]: name });

      return res.status(200).json({ success: true, name });
    } catch (error) {
      console.error('Redis error:', error);
      return res.status(500).json({ error: 'Failed to set name' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

