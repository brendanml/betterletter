import { createClient } from 'redis';
import { RedisStore } from 'connect-redis';

const redisClient = createClient({
  url: process.env.REDIS_URL ?? "redis://localhost:6379",
  // socket: { reconnectStrategy: … }   // customise if you wish
});

export const redisStore = new RedisStore({
  client: redisClient,   // required
  prefix: "sess:",       // optional — change if several apps share one DB
  ttl: 60 * 60,          // optional — 1 h fallback TTL if cookie has no expires
  disableTouch: false    // keep-alive on every request (default false)
});

export const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log('Redis client connected');
  } catch (error) {
    console.error('Error connecting to Redis:', error);
  }
}