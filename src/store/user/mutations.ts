import { MutationTree } from 'vuex';
import { UserState } from './types';
import { DoumaUser } from '@locational/douma-types';

export const mutations: MutationTree<UserState> = {
    users_loaded(state, payload:any) {
        state.error = false;
        state.user_list = payload;
    },
    user_created(state, payload: any){
        state.error = false
    },
    user_error(state) {
        state.error = true;
        state.user = undefined;
    }
};