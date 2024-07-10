import express from "express"
import cors from "cors"
import redis from "redis"
import timeline from "./src/api/v1/routes/timeline.js";
const app = express();

const port = process.env.PORT;

app.use(cors());

const redisClient = redis.createClient({ host: "127.0.0.1", port: "16379" });

(async () => {
  redisClient.on('error', (err) => {
    console.log('Redis Client Error', err);
  });
  redisClient.on('ready', () => console.log('Redis is ready'));
  await redisClient.connect();
  await redisClient.ping();
})();

// Importing Routes
app.use("/timeline", timeline);

app.listen(port, () => {
  console.log("Server is running on port ", port);
});
