import {
  getAllFriendsPosts,
  getAllPublicPosts,
  getDeactivatedUsers,
  getFriends,
  getUsernames,
} from "../helper/externalAPIs.js";
import redisClient from "../helper/redisConnection.js";

export const setCache = async (id) => {
  try {
    // const friends = await getFriends(id);
    const newPosts = await getAllPublicPosts();
    // const privatePosts = await getAllFriendsPosts(friends);
    // const newPosts = publicPosts.concat(privatePosts);
    // const newPosts = posts.filter(
    //   async (post) => !(await getDeactivatedUsers()).includes(post.userId)
    // );
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
    await redisClient.set(id, JSON.stringify({ cachedDatetime: new Date(), timelinePosts }), (err) => {
      console.log("err", err);
    });
  } catch (error) {
    console.log(error);
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
