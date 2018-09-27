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
  applets_config: TConfig | null;
  instance_id_and_version: {
    config_id: string,
    config_version: string,
  } | null;
  user: DoumaUser | null;
  creating_new_config: boolean;
  validation_result: TUnifiedResponse | null;
  validation_status: ValidationStatus;
}

const store = new Vuex.Store({
  plugins: [createPersistedState({
    paths: ['applets_config', 'instance_id_and_version', 'user', 'creating_new_config'],
  })],
  state: {
    applets_config: null,
    // TODO: rename instance to something else
    instance_id_and_version: null,
    user: null,
    creating_new_config: false,
    validation_result: null,
    validation_status: ValidationStatus.NotValidated,
  } as State,
  mutations: {
    set_applets_config(state: State, config: TConfig) {
      state.applets_config = config;
    },
    set_user(state: State, user: DoumaUser) {
      state.user = user;
    },
    set_instance_id_and_version(state: State, instance_id_and_version: any) {
      state.instance_id_and_version = instance_id_and_version;
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
    create_instance(){

    },
    delete_instance(){

    },
    get_instances(){

    },
    create_instance_config(){

    },
    delete_instance_config(){

    },
    list_instance_configs(){

    },
    get_instance_config(){

    },
    create_geodata_level(){

    },
    delete_level(){

    },
    list_geodata_levels(){

    },
    get_geodata_level(){

    },
    create_user(){

    },
    get_instance_users(){

    },
    get_all_users(){

    },
    delete_user(){

    },
    update_user(){

    },
    get_instance_permissions(){

    },
    create_permission(){

    },
    remove_permission(){
      
    }
  },
});

// @ts-ignore
set_api_key(store.state.user ? store.state.user.key : '');

export default store;
