
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
    async create({ commit }, {config_data,instance_id}) {
        try {
            const result = await create_configuration(config_data,instance_id)
            commit('config_created', result);
        } catch (error) {
            commit('config_error', error)
        }
    },
    async get({ commit },{instance_id}) {
        try {
            const result = await get_configurations(instance_id)
            commit('list_loaded', result)
        } catch (error) {
            commit('config_error', error);
        }

    },
    async get_one({ commit }, config_id: string) {
        try{
            const result = await get_configuration(config_id)
            commit('config_loaded', result)
        }catch(error){
            commit('config_error',error)
        }
       
    }
};