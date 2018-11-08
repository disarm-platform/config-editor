import {ActionTree} from 'vuex';
import {
    create,
    remove,
    get_user_permissions
} from '@/lib/permission';
import {PermissionState} from './types';

import {RootState} from '../types';


export const actions: ActionTree<PermissionState, RootState> = {
    async create({commit}, {user_id, value, instance_id}) {
        try {
            const result = await create({user_id,value,instance_id});
            commit('permission_created', result);
        } catch (e) {
            commit('permission_error', e.message);
        }
    },
    async remove({commit}, {instance_id,value,user_id}) {
        try {
            const result = await remove({user_id,value,instance_id});
            commit('permission_removed', result);
        } catch (e) {
            commit('permission_error', e.message);
        }
    },
    async get({commit},{instance_id,user_id}){
        try {
            const result = await remove({user_id,instance_id});
            commit('permissions_loaded', result);
        } catch (e) {
            commit('permission_error', e.message);
        }
    }
};