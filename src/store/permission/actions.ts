import {ActionTree} from 'vuex';
import {
    create,
    remove,
    get_permissions,
} from '@/lib/permission';
import {PermissionState} from './types';

import {RootState} from '../types';


export const actions: ActionTree<PermissionState, RootState> = {
    async create({commit}, {user_id, value, instance_id}) {
        try {
            const result = await create({user_id, value, instance_id});
            return result;
        } catch (e) {
            commit('permission_error', e.message);
        }
    },
    async remove({commit}, {instance_id, value, user_id}) {
        try {
            const result = await remove({user_id, value, instance_id});
            commit('permission_removed', result);
        } catch (e) {
            commit('permission_error', e.message);
        }
    },
    async get({commit}) {
        try {
            const result = await get_permissions();
            commit('permissions_loaded', result);
        } catch (e) {
            commit('permission_error', e.message);
        }
    },
};
