export default getAllFilteredPosts = (posts, deactivatedUser) => {
  const newPosts = posts.filter(
    (post) => !deactivatedUser.includes(post.userId)
  );
  return newPosts;
};
