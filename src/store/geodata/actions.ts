
import { ActionTree } from 'vuex';
import { TConfig } from '@locational/config-validation/build/module/lib/config_types/TConfig';
import {
    TGeodataLayer,
    TGeodataLayerDefinition,
  } from '@locational/geodata-support/build/module/config_types/TGeodata';
import {
   create_level,
   get_levels,
   get_level,
} from '@/lib/geodata';
import { GeodataState } from './types';

import { RootState } from '../types';


export const actions: ActionTree<GeodataState, RootState> = {
    async create({ commit }, {instance, level, geojson}) {
        try {
            const result = await create_level(instance, level, geojson);
            commit('layer_created', result);
        } catch (error) {
            commit('layer_error', error);
        }

    },
    async get({ commit }, {instance}) {
        try {
            const result = await get_levels(instance);
            commit('layer_list_loaded', result);
        } catch (error) {
            commit('layer_error', error);
        }
    },
    async get_one({ commit }, {instance, level}) {
        try {
            const result = await get_level(instance, level);
            commit('layer_loaded', result);
        } catch (error) {
            commit('layer_error', error);
        }
    },
};
