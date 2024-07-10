import express from "express"
import cors from "cors"
import 'dotenv/config'

import timeline from "./src/api/v1/routes/timeline.js";
import redisClient from "./src/api/v1/helper/redisConnection.js";

const app = express();

const port = process.env.PORT;

app.use(cors());

await redisClient.connect()

// Importing Routes
app.use("/timeline", timeline);

app.listen(port, () => {
  console.log("Server is running on port ", port);
});
