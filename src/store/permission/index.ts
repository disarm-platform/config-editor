import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { PermisionState } from './types';
import { RootState } from '../types';

export const state: PermisionState = {
    permission_list: [],
    permission: null,
    error: false
};

const namespaced: boolean = true;

export const permission: Module<PermisionState, RootState> = {
    namespaced,
    state,
    getters,
    actions,
    mutations
};