import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import { set_api_key } from '@/lib/standard_handler';

export enum ValidationStatus {
  NotValidated = 'Not validated',
  Valid = 'Valid',
  Invalid = 'Invalid',
}

Vue.use(Vuex);

const store = new Vuex.Store({
  plugins: [createPersistedState({
    paths: ['config', 'instance', 'user', 'creating_new_config'],
  })],
  state: {
    config: null,
    instance: null,
    user: null,
    creating_new_config: false,
    validation_result: null,
    validation_status: ValidationStatus.NotValidated,
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
    set_creating_new_config(state, creating_new_config) {
      state.creating_new_config = creating_new_config;
    },

    set_validation_result(state, validation_result) {
      state.validation_result = validation_result;
    },
    reset_validation_result(state) {
      state.validation_result = null;
    },

    set_validation_status(state, status: ValidationStatus) {
      state.validation_status = status;
    },
    reset_validation_status(state) {
      state.validation_status = ValidationStatus.NotValidated;
    },
  },
  actions: {

  },
});

// @ts-ignore
set_api_key(store.state.user ? store.state.user.key : '');

export default store;
