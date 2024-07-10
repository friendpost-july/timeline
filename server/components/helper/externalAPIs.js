const { friendsServiceAPI, userServiceAPI } = require("./constants");

exports.getFriends = async (userId) => {
  if (userId) {
    try {
      const response = await axios.get(
        `${friendsServiceAPI}/friends/${userId}`
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
    let listOfDeactivatedUsers = response.filter((user) => user.id);
    return listOfDeactivatedUsers;
  } catch (error) {
    return [];
  }
};
