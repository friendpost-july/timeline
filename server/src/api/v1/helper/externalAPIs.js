import {
  POST_SERVICE_ENV,
  FRIENDS_SERVICE_ENV,
  USER_SERVICE_ENV,
} from "./constants.js";

import axios from 'axios';

export const getFriends = async (userId) => {
  if (userId) {
    try {
      const response = await axios.get(
        `${FRIENDS_SERVICE_ENV}/friends/?userId=${userId}`
      );
      let listOfFriendsId = response.data.map((friend) => friend.friendId);
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
    const response = await axios.post(`${USER_SERVICE_ENV}/filter`, body);
    let listOfDeactivatedUsers = response.data.map((user) => user.id);
    return listOfDeactivatedUsers;
  } catch (error) {
    return [];
  }
};

export const getAllFriendsPosts = async (friendsList) => {
  try {
    const body = {
      filter: {
        userIds: friendsList,
        visibility: "private",
      },
      sort: {
        field: "creationTime",
      },
    };
    const response = await axios.post(`${POST_SERVICE_ENV}/searchposts`, body);
    return response.data.posts;
  } catch (error) {
    return [];
  }
};

export const getAllPublicPosts = async () => {
  try {
    const body = {
      filter: {
        visibility: "public",
      },
      sort: {
        field: "creationTime",
      },
    };
    const response = await axios.post(`${POST_SERVICE_ENV}/searchposts`, body);
    return response.data.posts;
  } catch (error) {
    return [];
  }
};

export const getUsernames = async (userIds) => {
  try {
    const response = await axios.get(
      `${USER_SERVICE_ENV}/users?ids=${userIds}`
    );
    const usersList = response.data.map((user) => ({
      fullName: user.fullName,
      id: user.id,
    }));
    return usersList;
  } catch (error) {
    console.log('Error while getting users:', error);
    return [];
  }
};
