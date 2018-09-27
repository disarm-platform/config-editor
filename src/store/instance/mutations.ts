import { MutationTree } from 'vuex';
import { InstanceState, TInstance } from './types';

export const mutations: MutationTree<InstanceState> = {
    instance_loaded(state, payload: TInstance) {
        state.error = false;
        state.instace = payload;
    },
    instance_list_loaded(state, payload: any) {
        state.instance_list = payload;
        state.error = false;
    },
    config_error(state) {
        state.error = true;
        state.instace = undefined;
    }
};