import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import { DoumaUser } from '@locational/douma-types/main';
import { set_api_key } from '@/lib/standard_handler';
import { TConfig } from '../node_modules/@locational/config-validation/build/module/lib/config_types/TConfig';
import { TUnifiedResponse } from '../node_modules/@locational/config-validation/build/module/lib/TUnifiedResponse';

export enum ValidationStatus {
  NotValidated = 'Not validated',
  Valid = 'Valid',
  Invalid = 'Invalid',
}

Vue.use(Vuex);

interface State {
  config: TConfig | null;
  instance: any;
  user: DoumaUser | null;
  creating_new_config: boolean;
  validation_result: TUnifiedResponse | null;
  validation_status: ValidationStatus;
}

const store = new Vuex.Store({
  plugins: [createPersistedState({
    paths: ['config', 'instance', 'user', 'creating_new_config'],
  })],
  state: {
    config: null,
    // TODO: rename instance to something else
    instance: null,
    user: null,
    creating_new_config: false,
    validation_result: null,
    validation_status: ValidationStatus.NotValidated,
  } as State,
  mutations: {
    set_config(state: State, config: TConfig) {
      state.config = config;
    },
    set_user(state: State, user: DoumaUser) {
      state.user = user;
    },
    set_instance(state: State, instance: any) {
      state.instance = instance;
    },
    set_creating_new_config(state: State, creating_new_config: boolean) {
      state.creating_new_config = creating_new_config;
    },

    set_validation_result(state: State, validation_result: TUnifiedResponse) {
      state.validation_result = validation_result;
    },
    reset_validation_result(state: State) {
      state.validation_result = null;
    },

    set_validation_status(state: State, status: ValidationStatus) {
      state.validation_status = status;
    },
    reset_validation_status(state: State) {
      state.validation_status = ValidationStatus.NotValidated;
    },
  },
  actions: {

  },
});

// @ts-ignore
set_api_key(store.state.user ? store.state.user.key : '');

export default store;
