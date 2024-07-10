const { friendsServiceAPI, userServiceAPI } = require("./constants");

exports.getFriends = async (userId) => {
  if (userId) {
    try {
      const response = await axios.get(
        `${friendsServiceAPI}/friends/?userId=${userId}`
      );
      let listOfFriendsId = response.map((friend) => friend.friendId);
      return listOfFriendsId;
    } catch (error) {
      return [];
    }
  }
  return [];
};

exports.getDeactivatedUsers = async () => {
  try {
    const body = {
      status: false,
    };
    const response = await axios.post(`${userServiceAPI}/filter`, body);
    let listOfDeactivatedUsers = response.map((user) => user.id);
    return listOfDeactivatedUsers;
  } catch (error) {
    return [];
  }
};

exports.getAllPosts = async (includeUsers, excludeUsers) => {
  try {
    const body = {
      includeusers: includeUsers,
      excludeusers: excludeUsers,
    };
    const response = await axios.post(`${postServiceAPI}/posts`, body);
    return response;
  } catch (error) {
    return [];
  }
};
