# Buttplug CTO 🚀

A modern, interactive meme coin website featuring a clickable Buttplug CTO character with global click tracking and live market data integration.

## Features

- **Interactive Click Counter** - Click the Buttplug CTO logo to increment your personal and global click count
- **Global Leaderboard** - See top users by click count with username tracking
- **Live Market Data** - Real-time price data and charts from DexScreener
- **Theme Support** - Beautiful light/dark mode with red/blue hue effects
- **Responsive Design** - Works perfectly on desktop and mobile
- **Real-time Updates** - Global counter updates live across all users

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS + Framer Motion
- **Backend**: Vercel API Routes + Upstash Redis
- **Market Data**: DexScreener API integration
- **Deployment**: Vercel

## Getting Started

1. Install dependencies: `npm install`
2. Run development server: `npm run dev`
3. Open http://localhost:5173

## Deployment

The project is configured for easy deployment on Vercel:

1. Set up Upstash Redis (free tier available)
2. Deploy to Vercel with environment variables
3. Initialize the database by visiting `/api/init`

See [README-DEPLOYMENT.md](./README-DEPLOYMENT.md) for detailed deployment instructions.

## Environment Variables

- `UPSTASH_REDIS_REST_URL` - Your Upstash Redis URL
- `UPSTASH_REDIS_REST_TOKEN` - Your Upstash Redis token

## API Endpoints

- `POST /api/click` - Increment click counter
- `GET /api/stats` - Get global stats and leaderboard
- `POST /api/set-name` - Set username for leaderboard
- `POST /api/init` - Initialize global counter (run once after deployment)

## Contributing

This is a meme coin project - feel free to submit issues or pull requests!

## License

MIT License - Built with ❤️ for the plugged-in community

---

**Always DYOR and trade responsibly!** ⚡