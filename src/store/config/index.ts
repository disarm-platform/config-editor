import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { ConfigState } from './types';
import { RootState } from '../types';

export const state: ConfigState = {
    config_list: [],
    applets_config: null,
    error: false,
};

const namespaced: boolean = true;

export const config: Module<ConfigState, RootState> = {
    namespaced,
    state,
    getters,
    actions,
    mutations,
};
