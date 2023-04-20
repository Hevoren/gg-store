import authApi from "@/api/auth";
import { setItem } from "@/helpers/persistanceStorage";

const state = {
  isSubmitting: false,
  currentUser: null,
  validationErrors: null,
  isLoggedIn: null,
};

const getters = {
  isLoggedIn: (state) => {
    return Boolean(state.isLoggedIn);
  },
};

const mutations = {
  registerStart(state) {
    state.isSubmitting = true;
    state.validationErrors = null;
  },
  registerSuccess(state, payload) {
    state.isSubmitting = false;
    state.currentUser = payload;
    state.isLoggedIn = true;
  },
  registerFailure(state, payload) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  },
  loginStart(state) {
    state.isSubmitting = true;
    state.validationErrors = null;
  },
  loginSuccess(state, payload) {
    state.isSubmitting = false;
    state.currentUser = payload;
    state.isLoggedIn = true;
  },
  loginFailure(state, payload) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  },
  exitStart(state) {
    state.currentUser = null;
    state.isLoading = true;
    state.isLoggedIn = false;
    localStorage.clear();
  },
  exitSuccess(state) {
    state.currentUser = null;
    state.isLoading = false;
    state.isLoggedIn = false;
  },
};

const actions = {
  register(context, credentials) {
    return new Promise((resolve) => {
      context.commit("registerStart");
      authApi
        .register(credentials)
        .then((response) => {
          credentials.token = response.data.data.user_token;
          context.commit("registerSuccess", credentials);
          setItem("accessToken", response.data.data.user_token);
          resolve(response.data.user);
        })
        .catch((result) => {
          context.commit("registerFailure", result.response.data.error.errors);
        });
    });
  },
  login(context, credentials) {
    return new Promise((resolve) => {
      context.commit("loginStart");
      authApi
        .login(credentials)
        .then((response) => {
          credentials.token = response.data.data.user_token;
          context.commit("loginSuccess", credentials);
          setItem("accessToken", response.data.data.user_token);
          resolve();
        })
        .catch((result) => {
          if (result.response.data.error.code === 401) {
            context.commit("loginFailure", {
              gg: ["Email or password incorrect"],
            });
          } else {
            context.commit("loginFailure", result.response.data.error.errors);
          }
        });
    });
  },

  exit(context) {
    context.commit("exitStart");
    authApi.logout().then(() => {
      localStorage.clear();
      context.commit("exitSuccess");
    });
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
