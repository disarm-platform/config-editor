import { GetterTree } from 'vuex';
import { ConfigState } from './types';
import { RootState } from '../types';

export const getters: GetterTree<ConfigState, RootState> = {
    config_id(state): any {
        const { applets_config } = state;
        // @ts-ignore
        return 'applets_config._id';
    },
};
