
import { ActionTree } from 'vuex';
import {
    create_instance,
    get_instance,
    get_instances
} from '@/lib/instance'
import { InstanceState } from './types';

import { RootState } from '../types';


export const actions: ActionTree<InstanceState, RootState> = {
    async create({ commit }, instance_data) {
        try {
            const result = await create_instance(instance_data);
            commit('instance_created', result)
        } catch (error) {
            commit('instance_error', error);
        }
    },
    async get({ commit }) {
        try {
            const result = await get_instances();
            commit('instance_list_loaded', result);
        } catch (error) {
            //console.log('Request Error',error)
           // commit('instance_error', error);
        }
    },
    async get_one({ commit }, instance_id) {
        try {
            const result = await get_instance(instance_id);
            commit('instance_loaded', result);
        } catch (error) {
            commit('instance_error', error);
        }
    }
};