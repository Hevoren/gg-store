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
  addFeedStart(state) {
    state.isLoading = true;
  },
  addFeedSuccess(state) {
    state.isLoading = false;
  },
  getFeedCartStart(state) {
    state.isLoading = true;
    state.data = null;
  },
  getFeedCartSuccess(state, payload) {
    state.isLoading = false;
    state.data = payload;
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
};

export default {
  state,
  actions,
  mutations,
};
