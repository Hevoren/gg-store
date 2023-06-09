import feedApi from "@/api/feed";
import currentUser from "@/store/modules/auth";
import axios from "axios";

const state = {
  data: null,
  isLoading: false,
  error: null,
  delData: null,
};

const mutations = {
  getFeedStart(state) {
    state.isLoading = true;
    state.data = null;
  },
  getFeedSuccess(state, payload) {
    state.isLoading = false;
    console.log("data1", state.data, "payload1", payload);
    state.data = payload;
    console.log("data2", state.data, "payload2", payload);
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
  addFeedFailure(state) {
    state.isLoading = false;
  },
  // ------------------------------------------------------
  getFeedCartStart(state) {
    state.isLoading = true;
    state.data = null;
    state.delData = null;
  },
  getFeedCartSuccess(state, payload) {
    state.isLoading = false;
    state.data = payload;
    state.delData = { ...payload };
  },
  getFeedCartFailure(state) {
    state.isLoading = false;
  },
  // ------------------------------------------------------
  removeFeedStart(state) {
    state.isLoading = true;
  },
  removeFeedSuccess(state) {
    state.isLoading = false;
  },
  removeFeedFailure(state) {
    state.isLoading = false;
  },
  // ------------------------------------------------------
  groupFeedStart(state) {
    state.isLoading = true;
  },
  groupFeedSuccess(state, payload) {
    state.isLoading = false;
    state.data = payload;
  },
  // ------------------------------------------------------
  increaseFeedCartStart(state) {
    state.isLoading = true;
  },
  increaseFeedCartSuccess(state) {
    state.isLoading = false;
  },
  increaseFeedCartFailure(state) {
    state.isLoading = false;
  },
  // ------------------------------------------------------
  orderFeedStart(state) {
    state.isLoading = true;
  },
  orderFeedSuccess(state) {
    state.isLoading = false;
    state.data = null;
  },
  orderFeedFailure(state) {
    state.isLoading = false;
  },
  // ------------------------------------------------------
  getOrderFeedStart(state) {
    state.isLoading = true;
    state.data = null;
  },
  getOrderFeedSuccess(state, payload) {
    state.isLoading = false;
    state.data = payload;
  },
  getOrderFeedFailure(state) {
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
      feedApi
        .postFeed(apiUrl)
        .then((response) => {
          context.commit("addFeedSuccess");
          resolve(response);
        })
        .catch(() => {
          context.commit("addFeedFailure");
        });
    });
  },
  getFeedCart(context, { apiUrl }) {
    return new Promise((resolve) => {
      context.commit("getFeedCartStart");
      const token = currentUser.state.currentUser.token;
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      feedApi
        .getFeed(apiUrl)
        .then((response) => {
          context.commit("getFeedCartSuccess", response.data);
          resolve(response.data);
        })
        .catch(() => {
          context.commit("getFeedCartFailure");
        });
    });
  },

  removeFeed(context, { apiUrl }) {
    return new Promise((resolve) => {
      context.commit("removeFeedStart");
      const token = currentUser.state.currentUser.token;
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      feedApi
        .removeFeed(apiUrl)
        .then((response) => {
          context.commit("removeFeedSuccess");
          resolve(response);
        })
        .catch(() => {
          context.commit("removeFeedFailure");
        });
    });
  },

  groupFeedsCart(context) {
    context.commit("groupFeedStart");
    state.data.data = state.data.data.reduce((acc, obj) => {
      let found = acc.find((item) => item.product_id === obj.product_id);
      if (found) {
        found.count++;
      } else {
        acc.push({
          id: obj.id,
          product_id: obj.product_id,
          price: obj.price,
          name: obj.name,
          description: obj.description,
          count: 1,
        });
      }
      return acc;
    }, []);
    context.commit("groupFeedSuccess", state.data.data);
  },

  increaseFeedCart(context, { apiUrl }) {
    return new Promise((resolve) => {
      context.commit("increaseFeedCartStart");
      const token = currentUser.state.currentUser.token;
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      feedApi
        .postFeed(apiUrl)
        .then((response) => {
          context.commit("increaseFeedCartSuccess");
          resolve(response);
        })
        .catch(() => {
          context.commit("increaseFeedCartFailure");
        });
    });
  },

  orderFeed(context, { apiUrl }) {
    return new Promise((resolve) => {
      context.commit("orderFeedStart");
      const token = currentUser.state.currentUser.token;
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      feedApi
        .orderFeed(apiUrl)
        .then((response) => {
          context.commit("orderFeedSuccess");
          resolve(response);
        })
        .catch(() => {
          context.commit("orderFeedFailure");
        });
    });
  },

  getOrderFeed(context, { apiUrl }) {
    return new Promise((resolve) => {
      context.commit("getOrderFeedStart");
      const token = currentUser.state.currentUser.token;
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      feedApi
        .getFeed(apiUrl)
        .then((response) => {
          context.commit("getOrderFeedSuccess", response.data);
          console.log(response.data);
          resolve(response);
        })
        .catch(() => {
          context.commit("getOrderFeedFailure");
        });
    });
  },
};
export default {
  state,
  actions,
  mutations,
};
