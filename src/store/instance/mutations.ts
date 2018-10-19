import { MutationTree } from 'vuex';
import { InstanceState, TInstance } from './types';

export const mutations: MutationTree<InstanceState> = {
    instance_loaded(state, payload: TInstance) {
        state.error = false;
        state.instance = payload;
    },
    instance_list_loaded(state, payload: any) {
        console.log('instance list',payload)
        state.instance_list = payload;
        state.error = false;
    },
    instance_error(state) {
        console.log('Instance Error')
        state.error = true;
        state.instance = undefined;
    }
};