
import { ActionTree } from 'vuex';
import { TConfig } from '@locational/config-validation/build/module/lib/config_types/TConfig';
import {
    TGeodataLayer,
    TGeodataLayerDefinition
  } from "@locational/geodata-support/build/module/config_types/TGeodata"
import {
   create_level,
   get_levels,
   get_level
} from '@/lib/geodata'
import { GeodataState } from './types';

import { RootState } from '../types';


export const actions: ActionTree<GeodataState, RootState> = {
    create({ commit }): any {
    },
    get({ commit }): any {

    },
    get_one({ commit }): any {

    }
};