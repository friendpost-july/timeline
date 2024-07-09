const express = require('express')
const timeline = express.Router()

const timelineData = require("../../../../sample_data/timelinedata");

// define the home page route
timeline.get('/:id', (req, res) => {
  res.send(timelineData);
})

module.exports = timeline;