import type { VercelRequest, VercelResponse } from '@vercel/node';
import { redis } from './redis';

// Initialize database with starting values (call this once)
export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Check if global counter exists
    const exists = await redis.exists('global:clicks');
    
    if (!exists) {
      // Set initial value to 42069 (or any number you want)
      await redis.set('global:clicks', 42069);
      return res.status(200).json({ 
        message: 'Database initialized', 
        globalClicks: 42069 
      });
    }
    
    const current = await redis.get('global:clicks');
    return res.status(200).json({ 
      message: 'Already initialized', 
      globalClicks: current 
    });
  } catch (error) {
    console.error('Init error:', error);
    return res.status(500).json({ error: 'Failed to initialize' });
  }
}


