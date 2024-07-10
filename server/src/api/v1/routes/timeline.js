import { Router } from "express";
const timeline = Router();

import { setCache, getCache } from '../methods/timeline.methods.js';

// define the home page route
timeline.get('/:id', async (req, res) => {
  const id = req.params.id
  try {
    const posts = await getCache(id)
    setCache(id)
    res.status(200).send(posts)
  } catch (error) {
    res.status(500).send("Internal Server Error")
  }
})

export default timeline;
