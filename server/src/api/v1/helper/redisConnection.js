import redis from "redis";
const redisClient = redis.createClient({
  socket: {
    host: process.env.REDIS_HOST || "0.0.0.0",
    port: process.env.REDIS_PORT || 6379,
  },
});
(async () => {
  redisClient.on("error", (err) => {
    console.log("Redis Client Error -->", err);
  });
  redisClient.on("ready", () => console.log("Redis is ready"));
})();

export default redisClient;
