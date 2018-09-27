import { MutationTree } from 'vuex';
import { ConfigState } from './types';
import { TConfig } from '@locational/config-validation/build/module/lib/config_types/TConfig';
import { stat } from 'fs';

export const mutations: MutationTree<ConfigState> = {
    config_loaded(state, payload: TConfig) {
        state.error = false;
        state.applets_config = payload;
    },
    list_loaded(state,payload:any){
        state.config_list =  payload;
        state.error = false;
    },
    config_created(state,payload:TConfig){
        state.applets_config = payload;
        state.error = false;
    },
    config_error(state) {
        state.error = true;
        state.applets_config = undefined;
    }
};