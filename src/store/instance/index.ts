import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { InstanceState } from './types';
import { RootState } from '../types';

export const state: InstanceState = {
    instance_list: [],
    instance: null,
    error: false,
};

const namespaced: boolean = true;

export const instance: Module<InstanceState, RootState> = {
    namespaced,
    state,
    getters,
    actions,
    mutations,
};
