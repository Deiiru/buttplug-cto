require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { redis } = require('./api/redis');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

// API Routes
app.get('/api/stats', async (req, res) => {
  try {
    const userId = req.cookies?.uid;
    
    // Get global total
    const globalTotal = await redis.get('global:clicks') || 0;
    
    // Get user total
    let userTotal = 0;
    if (userId) {
      userTotal = await redis.hget('user:clicks', userId) || 0;
    }
    
    // Get all user clicks for leaderboard
    const allUserClicks = await redis.hgetall('user:clicks') || {};
    
    // Get user names
    const userNames = await redis.hgetall('user:names') || {};
    
    // Build leaderboard
    const leaderboard = Object.entries(allUserClicks)
      .map(([id, clicks]) => ({
        id,
        name: userNames[id] || 'Anonymous',
        clicks: Number(clicks),
      }))
      .sort((a, b) => b.clicks - a.clicks)
      .slice(0, 10);

    res.json({
      globalTotal,
      userTotal,
      leaderboard,
    });
  } catch (error) {
    console.error('Redis error:', error);
    res.status(500).json({ error: 'Failed to get stats' });
  }
});

app.post('/api/click', async (req, res) => {
  try {
    const userId = req.cookies?.uid || `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Increment global counter
    const globalTotal = await redis.incr('global:clicks');
    
    // Increment user counter
    const userTotal = await redis.hincrby('user:clicks', userId, 1);

    // Set cookie if new user
    if (!req.cookies?.uid) {
      res.cookie('uid', userId, { 
        httpOnly: true, 
        maxAge: 31536000000, // 1 year
        sameSite: 'lax'
      });
    }

    res.json({
      globalTotal,
      userTotal,
    });
  } catch (error) {
    console.error('Redis error:', error);
    res.status(500).json({ error: 'Failed to register click' });
  }
});

app.post('/api/set-name', async (req, res) => {
  try {
    const userId = req.cookies?.uid;
    const { name } = req.body;

    if (!userId) {
      return res.status(401).json({ error: 'No user ID' });
    }

    if (!name || typeof name !== 'string' || name.length > 20 || name.length < 1) {
      return res.status(400).json({ error: 'Invalid name (1-20 characters)' });
    }

    // Store user name in Redis
    await redis.hset('user:names', { [userId]: name });

    res.json({ success: true, name });
  } catch (error) {
    console.error('Redis error:', error);
    res.status(500).json({ error: 'Failed to set name' });
  }
});

app.get('/api/init', async (req, res) => {
  try {
    // Check if global counter exists
    const exists = await redis.exists('global:clicks');
    
    if (!exists) {
      // Set initial value to 42069
      await redis.set('global:clicks', 42069);
      return res.json({ 
        message: 'Database initialized', 
        globalClicks: 42069 
      });
    }
    
    const current = await redis.get('global:clicks');
    return res.json({ 
      message: 'Already initialized', 
      globalClicks: current 
    });
  } catch (error) {
    console.error('Init error:', error);
    res.status(500).json({ error: 'Failed to initialize' });
  }
});

// Serve the React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Global clicks API: http://localhost:${PORT}/api/global-clicks`);
});
