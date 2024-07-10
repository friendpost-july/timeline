import redis from "redis"
const redisClient = redis.createClient({ host: process.env.REDIS_HOST, port: process.env.REDIS_PORT });
(async () => {
    redisClient.on('error', (err) => {
        console.log('Redis Client Error -->', err);
    });
    redisClient.on('ready', () => console.log('Redis is ready'));
})();

export default redisClient
