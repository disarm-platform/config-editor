import { GetterTree } from 'vuex';
import { GeodataState } from './types';
import { RootState } from '../types';

export const getters: GetterTree<GeodataState, RootState> = {
    config_id(state): any {
        const { geodata_layer } = state;
        // @ts-ignore
        return 'geodata_layer._id';
    },
};
