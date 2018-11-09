import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { PermissionState } from './types';
import { RootState } from '../types';
import { DoumaReadPermissions } from '@locational/douma-types';
import { DoumaWritePermissions } from '@locational/douma-types';

export const state: PermissionState = {
    permission_list: [],
    permission : {} as DoumaReadPermissions | DoumaWritePermissions,
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