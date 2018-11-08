import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import {DoumaUser} from '@locational/douma-types';
import {set_api_key} from '@/lib/standard_handler';
import {TConfig} from '@locational/config-validation/build/module/lib/config_types/TConfig';
import {TUnifiedResponse} from '@locational/config-validation/build/module/lib/TUnifiedResponse';

import {user} from './user';
import {config} from './config';
import {instance} from './instance';
import {geodata} from './geodata';
import {permission} from './permission';

import {RootState, ValidationStatus} from './types';


Vue.use(Vuex);


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
    } as RootState,
    mutations: {
        set_applets_config(state: RootState, config: TConfig) {
            state.applets_config = config;
        },
        set_user(state: RootState, user: DoumaUser) {
            state.user = user;
        },
        set_instance_id_and_version(state: RootState, instance_id_and_version: any) {
            console.log(instance_id_and_version);
            state.instance_id_and_version = instance_id_and_version;
        },
        set_instance_id(state: RootState, instance_id: any) {

        },
        set_config_id(state: RootState, config_id: any) {

        },
        set_creating_new_config(state: RootState, creating_new_config: boolean) {
            state.creating_new_config = creating_new_config;
        },

        set_validation_result(state: RootState, validation_result: TUnifiedResponse) {
            state.validation_result = validation_result;
        },
        reset_validation_result(state: RootState) {
            state.validation_result = null;
        },

        set_validation_status(state: RootState, status: ValidationStatus) {
            state.validation_status = status;
        },
        reset_validation_status(state: RootState) {
            state.validation_status = ValidationStatus.NotValidated;
        },
    },
    actions: {},
    modules: {
        user,
        instance,
        geodata,
        permission,
        config
    }
});

// @ts-ignore
set_api_key(store.state.user ? store.state.user.key : '');

export default store;
