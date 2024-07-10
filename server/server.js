import express from "express";
import cors from "cors"
import timeline from "./src/api/v1/routes/timeline";
const app = express();

const port = process.env.PORT;

app.use(cors());

// Importing Routes
app.use("/timeline", timeline);

app.listen(port, () => {
  console.log("Server is running on port ", port);
});
