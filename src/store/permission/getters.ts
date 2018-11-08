import { GetterTree } from 'vuex';
import { PermisionState } from './types';
import { RootState } from '../types';

export const getters: GetterTree<PermisionState, RootState> = {
    config_id(state): any {
        const { permission } = state;
        //@ts-ignore
        return 'user._id';
    },
    permissions(state):any {
        return state.permission_list
    }
};