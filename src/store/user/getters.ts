import { GetterTree } from 'vuex';
import { UserState } from './types';
import { RootState } from '../types';

export const getters: GetterTree<UserState, RootState> = {
    config_id(state): any {
        const { user } = state;
        //@ts-ignore
        return 'user._id';
    },
    users(state):any {
        return state.user_list
    }
};