import { GetterTree } from 'vuex';
import { PermissionState } from './types';
import { RootState } from '../types';

export const getters: GetterTree<PermissionState, RootState> = {
    config_id(state): any {
        const { permission } = state;
        // @ts-ignore
        return 'user._id';
    },
    permissions(state): any {
        return state.permission_list;
    },
};
