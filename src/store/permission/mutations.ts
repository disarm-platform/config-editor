import { MutationTree } from 'vuex';
import { PermissionState } from './types';
import { DoumaUser } from '@locational/douma-types';

export const mutations: MutationTree<PermissionState> = {
    permissions_loaded(state, payload:any) {
        state.error = false;
        state.permission_list = payload;
    },
    permissions_created(state, payload: any){
        state.error = false
    },
    permissions_error(state) {
        state.error = true;
        state.permission = undefined;
    }
};