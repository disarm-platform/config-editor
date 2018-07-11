import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'
import { set_api_key } from '@/lib/standard_handler';

Vue.use(Vuex);

const store = new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    config: null,
    instance: null,
    user: null,
  },
  mutations: {
    set_config(state, config) {
      state.config = config;
    },
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

// @ts-ignore
set_api_key(store.state.user.key)

export default store