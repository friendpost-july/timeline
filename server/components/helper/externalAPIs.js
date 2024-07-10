import { friendsServiceAPI, userServiceAPI, postServiceAPI } from "./constants";

export const getFriends = async (userId) => {
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

export const getDeactivatedUsers = async () => {
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

export const getAllFriendsPosts = async (friendsList) => {
  try {
    const body = {
      inciudeusers: friendsList,
    };
    const response = await axios.post(`${postServiceAPI}/posts`, body);
    return response;
  } catch (error) {
    return [];
  }
};

export const getAllPublicPosts = async () => {
  try {
    const response = await axios.post(`${postServiceAPI}/posts`);
    return response;
  } catch (error) {
    return [];
  }
};
