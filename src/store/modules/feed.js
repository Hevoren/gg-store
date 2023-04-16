import feedApi from "@/api/feed";
import currentUser from "@/store/modules/auth";
import axios from "axios";

const state = {
  data: null,
  isLoading: false,
  error: null,
};

const mutations = {
  getFeedStart(state) {
    state.isLoading = true;
    state.data = null;
  },
  getFeedSuccess(state, payload) {
    state.isLoading = false;
    state.data = payload;
  },
  getFeedFailure(state) {
    state.isLoading = false;
  },
  // ------------------------------------------------------
  addFeedStart(state) {
    state.isLoading = true;
  },
  addFeedSuccess(state) {
    state.isLoading = false;
  },
  // ------------------------------------------------------
  getFeedCartStart(state) {
    state.isLoading = true;
    state.data = null;
  },
  getFeedCartSuccess(state, payload) {
    state.isLoading = false;
    state.data = payload;
  },
  // ------------------------------------------------------
  removeFeedStart(state) {
    state.isLoading = true;
  },
  removeFeedSuccess(state) {
    state.isLoading = false;
  },
};

const actions = {
  getFeed(context, { apiUrl }) {
    return new Promise((resolve) => {
      context.commit("getFeedStart");
      feedApi
        .getFeed(apiUrl)
        .then((response) => {
          context.commit("getFeedSuccess", response.data);
          resolve(response.data);
        })
        .catch(() => {
          context.commit("getFeedFailure");
        });
    });
  },
  addFeed(context, { apiUrl }) {
    return new Promise((resolve) => {
      context.commit("addFeedStart");
      const token = currentUser.state.currentUser.token;
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      feedApi.postFeed(apiUrl).then((response) => {
        context.commit("addFeedSuccess");
        resolve(response);
      });
    });
  },
  getFeedCart(context, { apiUrl }) {
    return new Promise((resolve) => {
      context.commit("getFeedCartStart");
      const token = currentUser.state.currentUser.token;
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      feedApi.getFeed(apiUrl).then((response) => {
        context.commit("getFeedCartSuccess", response.data);
        resolve(response.data);
      });
    });
  },

  removeFeed(context, { apiUrl }) {
    return new Promise((resolve) => {
      context.commit("removeFeedStart");
      const token = currentUser.state.currentUser.token;
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      feedApi.removeFeed(apiUrl).then((response) => {
        context.dispatch("getFeedCart", { apiUrl: `/cart` });
        context.commit("removeFeedSuccess");
        resolve(response);
      });
    });
  },

  groupFeeds() {
    state.data.data = state.data.data.reduce((acc, obj) => {
      let found = acc.find((item) => item.product_id === obj.product_id);
      if (found) {
        found.count++;
      } else {
        acc.push({
          id: obj.id,
          product_id: obj.product_id,
          name: obj.name,
          description: obj.description,
          count: 1,
        });
      }
      return acc;
    }, []);
  },
};

export default {
  state,
  actions,
  mutations,
};
