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
      const users = {
        ...post,
        fullName: userList.find((user) => user.id === post.userId).fullName,
      };
      return users;
    });
    redisClient.set(id, timelinePosts);
  } catch (error) {
    return [];
  }
};

export const getCache = async (id) => {
  try {
    const posts = await redisClient.get(id);
    return posts;
  } catch (error) {
    return [];
  }
};
