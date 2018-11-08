import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { PermissionState } from './types';
import { RootState } from '../types';

export const state: PermissionState = {
    permission_list: [],
    permission: null,
    error: false
};

const namespaced: boolean = true;

export const permission: Module<PermissionState, RootState> = {
    namespaced,
    state,
    getters,
    actions,
    mutations
};