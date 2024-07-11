import redisClient from "./redisConnection.js";

// const posts = await redisClient.get(id);
// return JSON.parse(posts);

export const addPostsToTimeline = async (message) => {
    const userList = await getUsernames([message.post.userId]);
    const newPostData = { ...post, fullName: userList[0].fullName }
    const allKeys = await redisClient.keys('*')
    for (let key in allKeys) {
        const content = JSON.parse(await redisClient.get(key))
        const newTimeline = {
            cachedDatetime: new Date(),
            timelinePosts: [newPostData, ...content.timelinePosts]
        }
        await redisClient.set(key, JSON.stringify(newTimeline));
    }
}


export const removePostsFromTimeline = async (message) => {
    const allKeys = await redisClient.keys('*')
    for (let key in allKeys) {
        const content = JSON.parse(await redisClient.get(key))
        const timelinePosts = content.timelinePosts.filter((post) => post.postId == message.postId)
        const newTimeline = {
            cachedDatetime: new Date(),
            timelinePosts: timelinePosts
        }
        await redisClient.set(key, JSON.stringify(newTimeline));
    }
}
