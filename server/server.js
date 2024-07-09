const express = require('express');
const app = express();
const cors = require('cors');

const port = 3002;

app.use(cors());

// Importing Routes

const timeline = require('./src/api/v1/routes/timeline');
app.use("/timeline",timeline);

app.listen(port, ()=>{
    console.log("Server is running on port ",port);
})