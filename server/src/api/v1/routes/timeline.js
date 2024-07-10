import { Router } from 'express'
const timeline = Router()

import timelineData from '../../../../sample_data/timelinedata';
import { getFriends, getDeactivatedUsers, getAllPublicPosts, getAllFriendsPosts } from '../../../../components/helper/externalAPIs';


// define the home page route
timeline.get('/:id', (req, res) => {
  try {
    const posts = getAllPublicPosts().concat(getAllFriendsPosts())


    res.send(timelineData);

  } catch (error) {
    res.send(error)
  }


})

export default timeline;
