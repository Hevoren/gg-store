import authApi from "@/api/auth";
import { setItem } from "@/helpers/persistanceStorage";

const state = {
  isSubmitting: false,
  currentUser: null,
  validationErrors: null,
  isLoggedIn: null,
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
    state.isSubmitting = true;
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
};

const actions = {
  register(context, credentials) {
    return new Promise((resolve) => {
      context.commit("registerStart");
      authApi
        .register(credentials)
        .then((response) => {
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
          context.commit("loginSuccess", credentials);
          setItem("accessToken", response.data.data.user_token);

          resolve(response.data.user);
        })
        .catch((result) => {
          context.commit("loginFailure", result.response.data.error.errors);
        });
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
