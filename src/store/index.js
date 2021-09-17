import { createStore } from 'vuex'
import postService from "../postServices";
const jwt = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'Secret Code', {
    expiresIn: maxAge
  });
};

const messageTime = 3000;

export default createStore({
  state: {
    currentUserId: '',
    authentication: {
      email: '',
      password: ''
    },
    messages: {
      success: '',
      error: ''
    },
  },
  mutations: {
    updateEmail(state, payload) {
      state.authentication.email = payload;
    },
    updatePassword(state, payload) {
      state.authentication.password = payload;
    },
    updateSuccessMessage(state, message) {
      state.messages.success = message;

      setTimeout(() => {
        state.messages.success = ''
      }, messageTime);
    },
    updateErrorMessage(state, message) {
      state.messages.error = message;

      setTimeout(() => {
        state.messages.error = ''
      }, messageTime);
    },
    updateCurrentUserId(state, userId) {
      state.currentUserId = userId;
    },
    resetStates(state) {
      state.authentication.email = '';
      state.authentication.password = '';
    },
    logoutUser(state) {
      localStorage.removeItem("jwt")
      state.currentUserId = ''
    }
  },
  actions: {
    async createUser({ state, commit }) {
      let credential = {
        email: state.authentication.email,
        password: state.authentication.password
      }
      try {
        let result = await postService.createUser(credential);
        if (result.user) {
          const token = createToken(result.user);
          localStorage.setItem("jwt",token)
          commit("updateSuccessMessage", "User Created");
          commit("updateCurrentUserId", result.user)
        }
        if (result.errors) {
          if (result.errors.email) {
            console.log(result.errors.email)
            commit("updateErrorMessage", result.errors.email)
          } else {
            commit("updateErrorMessage", result.errors.password)
          }
        }
      } catch (err) {
        commit("updateErrorMessage", err);
      }
    },

    async loginUser({ state, commit }) {
      let credential = {
        email: state.authentication.email,
        password: state.authentication.password
      }
      try {
        let result = await postService.loginUser(credential);
        if (result.user) {
          const token = createToken(result.user);
          localStorage.setItem("jwt",token)
          commit("updateSuccessMessage","You are logged in");
          commit("updateCurrentUserId", result.user)
        }
        if (result.errors) {
          if (result.errors.email) {
            // console.log(result.errors.email)
            commit("updateErrorMessage", result.errors.email)
          } else {
            commit("updateErrorMessage", result.errors.password)
          }
        }
      } catch (err) {
        commit("updateErrorMessage", err);
      }
    },

    logoutUser(state) {
      state.commit("logoutUser");
    }
  },
  modules: {
  },
  getters:{
    messages: (state) => state.messages,
    userId: (state) => state.currentUserId,
  }
})
