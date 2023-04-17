import axios from "@/api/axios";

const getFeed = (apiUrl) => {
  return axios.get(apiUrl);
};

const postFeed = (credentials) => {
  return axios.post(credentials);
};

const removeFeed = (credentials) => {
  return axios.delete(credentials);
};

const orderFeed = (credentials) => {
  return axios.post(credentials);
};

export default {
  getFeed,
  postFeed,
  removeFeed,
  orderFeed,
};
