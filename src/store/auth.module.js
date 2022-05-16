import AuthService from '../services/auth.service';

const authData = JSON.parse(localStorage.getItem('authData'));

const initialState = authData
  ? { status: { loggedIn: true }, authData}
  : { status: { loggedIn: false }, authData: null };

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ commit }, userData) {
      return AuthService.login(userData).then(
        authResponse => {
          commit('loginSuccess', authResponse);
          return Promise.resolve(authResponse);
        },
        error => {
          commit('loginFailure');
          return Promise.reject(error);
        }
      );
    },
    logout({ commit }) {
      AuthService.logout();
      commit('logout');
    },
    register({ commit }, userData) {
      return AuthService.register(userData).then(
        response => {
          commit('registerSuccess');
          return Promise.resolve(response.data);
        },
        error => {
          commit('registerFailure');
          return Promise.reject(error);
        }
      );
    }
  },
  mutations: {
    loginSuccess(state, authData) {
      state.status.loggedIn = true;
      state.authData = authData;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.authData = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.authData = null;
    },
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    }
  }
};
