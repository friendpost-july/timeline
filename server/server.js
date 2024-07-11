import express from "express";
import cors from "cors";
import "dotenv/config";

import timeline from "./src/api/v1/routes/timeline.js";
import redisClient from "./src/api/v1/helper/redisConnection.js";
import amqp from 'amqplib';
import { addPostsToTimeline } from "./src/api/v1/helper/postEvents.js";

const app = express();

const port = process.env.PORT || 15033;

app.use(cors());

await redisClient.connect();

// RabbitMQ configuration
const rabbitMqUrl = process.env.RABBITMQ_URL || 'amqp://user:password@localhost'; // Replace with your RabbitMQ server URL
const exchangeName = process.env.RABBITMQ_EXCHANGE_NAME || '';
//const storedMessages = [];
// Connect to RabbitMQ and start listening
async function listenToRabbitMQ() {
  try {
    const connection = await amqp.connect(rabbitMqUrl);
    const channel = await connection.createChannel();

    await channel.assertExchange(exchangeName, 'fanout', { durable: false });
    const queue = await channel.assertQueue('', { exclusive: true });
    await channel.bindQueue(queue.queue, exchangeName, '');

    channel.consume(queue.queue, (msg) => {
      // Write stuff to react to receiving the event
      const message = JSON.parse(msg.content.toString());

      console.log('Received message:', message);
      addPostsToTimeline(message)
      //storedMessages.push(message);
    }, { noAck: true });

    console.log('Listening for messages on exchange:', exchangeName);
  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error);
  }
}

// Importing Routes
app.use("/timeline", timeline);

listenToRabbitMQ().then(() => {
  app.listen(port, () => {
    console.log("Server is running on port ", port);
  });
});
