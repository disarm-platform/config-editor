import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    location_selection: null,
  },
  mutations: {
    set_location_selection(state, location_selection) {
      state.location_selection = location_selection
    },
  },
  actions: {

  },
});
