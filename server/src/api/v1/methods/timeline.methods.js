import {
  getAllFriendsPosts,
  getAllPublicPosts,
  getFriends,
  getUsernames,
} from "../helper/externalAPIs.js";
import redisClient from "../helper/redisConnection.js";

export const setCache = async (id) => {
  try {
    const friends = getFriends(id);
    const publicPosts = await getAllPublicPosts();
    const privatePosts = await getAllFriendsPosts(friends);
    const posts = publicPosts.concat(privatePosts);
    const newPosts = posts.filter(
      (post) => !getDeactivatedUsers().includes(post.userId)
    );
    const uniqueUserIds = [
      ...new Set(newPosts.map((item) => item.userId)),
    ].toString();
    const userList = await getUsernames(uniqueUserIds);
    const timelinePosts = newPosts.map((post) => {
      const updatedPosts = {
        ...post,
        fullName: userList.find((user) => user.id === post.userId).fullName,
      };
      return updatedPosts;
    });
    await redisClient.set(id, JSON.stringify(timelinePosts), (err) => { console.log("err", err) });
  } catch (error) {
    console.log(error)
  }
};

export const getCache = async (id) => {
  try {
    const posts = await redisClient.get(id);
    return JSON.parse(posts);
  } catch (error) {
    return [];
  }
};
