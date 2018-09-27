
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
    create({ commit }): any {
    },
    get({ commit }): any {

    },
    get_one({ commit }): any {

    }
};