import { Router } from "express";
const timeline = Router();

import { setCache, getCache } from '../methods/timeline.methods.js';

// define the home page route
timeline.get('/:id', async (req, res) => {
  const id = req.params.id
  try {
    const posts = await getCache(id)
    if (posts) {
      const cachedDatetime = new Date(posts.cachedDatetime)
      const timeDiff = (new Date() - cachedDatetime) / 60000
      if (timeDiff > 2) {
        setCache(id)
      }
      res.status(200).send(posts.timelinePosts)
    } else {
      setCache(id)
      res.status(200).send([])
    }
  } catch (error) {
    res.status(500).send("Internal Server Error")
  }
})

export default timeline;
