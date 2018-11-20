import { MutationTree } from 'vuex';
import { InstanceState, TInstance } from './types';

export const MUTATIONS = {
    INSTANCE_LOADED: 'instance_loaded',
    INSTANCE_LIST_LOADED: 'instance_list_loaded',
    INSTANCE_ERROR: 'instance_error',
};

export const mutations: MutationTree<InstanceState> = {
    [MUTATIONS.INSTANCE_LOADED](state, payload: TInstance) {
        state.error = false;
        state.instance = payload;
    },
    [MUTATIONS.INSTANCE_LIST_LOADED](state, payload: any) {
        console.log('instance list', payload);
        state.instance_list = payload;
        state.error = false;
    },
    [MUTATIONS.INSTANCE_ERROR](state) {
        console.log('Instance Error');
        state.error = true;
        state.instance = undefined;
    },
};
