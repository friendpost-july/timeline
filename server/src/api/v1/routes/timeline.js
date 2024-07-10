import { Router } from 'express'
const timeline = Router()

// import timelineData from '../../../../sample_data/timelinedata';
import { getFriends, getDeactivatedUsers, getAllPublicPosts, getAllFriendsPosts, getUsernames } from '../../../../components/helper/externalAPIs.js';


// define the home page route
timeline.get('/:id', (req, res) => {
  const id = req.params.id
  try {
    const friends = getFriends(id)
    const posts = getAllPublicPosts().concat(getAllFriendsPosts(friends))
    const newPosts = posts.filter(
      (post) => !getDeactivatedUsers().includes(post.userId)
    )
    const uniqueUserIds = [...new Set(newPosts.map(item => item.userId))].toString();
    const userList = getUsernames(uniqueUserIds)
    const timelinePosts = newPosts.map((post) => {
      const users = {
        ...post,
        fullName: userList.find((user) => user.id === post.userId).fullName,
      };
      return users;
    });
    res.send(timelinePosts);

  } catch (error) {
    res.send(error)
  }


})

export default timeline;
