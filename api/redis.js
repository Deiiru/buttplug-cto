const { Redis } = require('@upstash/redis');

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || 'https://useful-mako-6592.upstash.io',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || 'ARnAAAImcDJhMDJkYzY1MmIwMzI0MTViOTY4NzBmMDg4NzZjYmU5NnAyNjU5Mg',
});

module.exports = { redis };


