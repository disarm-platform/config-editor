import { MutationTree } from 'vuex';
import { GeodataState } from './types';
import { TConfig } from '@locational/config-validation/build/module/lib/config_types/TConfig';
import {
    TGeodataLayer,
    TGeodataLayerDefinition,
  } from '@locational/geodata-support/build/module/config_types/TGeodata';

export const mutations: MutationTree<GeodataState> = {
    layer_loaded(state, payload: TGeodataLayer) {
        state.error = false;
        state.geodata_layer = payload;
    },
    layer_created(state, payload: any) {
        state.error = false;
    },
    layer_list_loaded(state, payload: any) {
        state.layer_list = payload;
    },
    layer_error(state) {
        state.error = true;
        state.geodata_layer = undefined;
    },
};
