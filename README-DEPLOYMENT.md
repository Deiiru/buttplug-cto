# Deployment Guide

## ✅ Done!

Your site now has:
- **Real global click counter** stored in Upstash Redis (FREE)
- **Persistent data** that never resets
- **Leaderboard** with user names
- Works 24/7 without your laptop

## Deploy to Vercel

1. **Set up Upstash Redis**:
   - Go to [upstash.com](https://upstash.com) and create a free account
   - Create a new Redis database
   - Copy the REST URL and Token from your dashboard

2. **Deploy on Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your project (upload folder or connect to new repo)
   - Add environment variables in Vercel dashboard:
     - `UPSTASH_REDIS_REST_URL` = your Redis URL
     - `UPSTASH_REDIS_REST_TOKEN` = your Redis token
   - Click Deploy
   - Done! Your API routes automatically work

3. **Initialize the counter** (one time):
   - After deployment, visit: `https://your-site.vercel.app/api/init`
   - This sets the starting count to 42,069
   - You'll see: `{"message":"Database initialized","globalClicks":42069}`

## How It Works

- **`/api/click`** - POST to increment clicks (global + user)
- **`/api/stats`** - GET leaderboard and totals
- **`/api/set-name`** - POST to set user's name for leaderboard
- **`/api/init`** - GET to initialize database (call once)

## Data Structure in Redis

```
global:clicks         → Number (total global clicks)
user:clicks           → Hash { userId: clickCount }
user:names            → Hash { userId: userName }
```

## Cost: $0 Forever 🎉

Upstash free tier gives you:
- 10,000 commands/day
- Unlimited storage
- No credit card needed
- No expiration

Your site will use ~1000-2000 commands/day with decent traffic = **FREE**

## Test Locally

The API routes won't work locally without Vercel dev server, but after deploying they'll work automatically!


