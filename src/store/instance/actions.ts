
import { ActionTree } from 'vuex';
import {
    create_instance,
    get_instance,
    get_instances
} from '@/lib/instance'
import { InstanceState } from './types';

import { RootState } from '../types';


export const actions: ActionTree<InstanceState, RootState> = {
    create({ commit }): any {

    },
    get({ commit }): any {

    },
    get_one({ commit }): any {

    }
};