import { MutationTree } from 'vuex';
import { PermissionState } from './types';
import {DoumaReadPermissions , DoumaWritePermissions } from '@locational/douma-types';



export const mutations: MutationTree<PermissionState> = {
    permissions_loaded(state, payload: any) {
        state.error = false;
        state.permission_list = payload;
    },

    permission_created(state, payload: DoumaReadPermissions | DoumaWritePermissions) {
        (state.permission_list as Array<DoumaReadPermissions | DoumaWritePermissions>).push(payload);
        state.error = false;
    },
    permission_error(state) {
        state.error = true;
        state.permission = undefined;
    },
};
