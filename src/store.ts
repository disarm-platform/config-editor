import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    instance: null,
    user: null,
  },
  mutations: {
    set_user(state, user) {
      state.user = user;
    },
    set_instance(state, instance) {
      state.instance = instance;
    },
  },
  actions: {

  },
});
