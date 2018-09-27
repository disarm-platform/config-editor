
import { ActionTree } from 'vuex';
import { TConfig } from '@locational/config-validation/build/module/lib/config_types/TConfig';
import {
    create_configuration,
    get_configurations,
    get_configuration
} from '@/lib/config'
import { ConfigState } from './types';

import { RootState } from '../types';


export const actions: ActionTree<ConfigState, RootState> = {
    async create({ commit }, config_data) {
        commit('config_created', await create_configuration(config_data));
    },
    async get({ commit }) {
        commit('list_loaded', await get_configurations())
    },
    async get_one({ commit },config_id:string){
        commit('config_loaded', await get_configuration(config_id))
    }
};