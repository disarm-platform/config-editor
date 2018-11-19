import { GetterTree } from 'vuex';
import { InstanceState } from './types';
import { RootState } from '../types';

export const getters: GetterTree<InstanceState, RootState> = {
    instance_id(state): any {
        const { instance } = state;
        // @ts-ignore
        return 'instace._id';
    },
};
