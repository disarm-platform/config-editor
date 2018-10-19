import {ActionTree} from 'vuex';
import {
    create_user,
    get_user,
    get_users,
    update_user,
    delete_user
} from '@/lib/user';
import {UserState} from './types';

import {RootState} from '../types';


export const actions: ActionTree<UserState, RootState> = {
    async create({commit}, {user_data, instance_id}) {
        try {
            const result = await create_user(user_data, instance_id);
            commit('user_created', result);
        } catch (e) {
            commit('user_error', e.message);
        }
    },
    async get({commit}, {instance_id}) {
        try {
            console.log('Load users');
            const result = await get_users(instance_id);
            commit('users_loaded', result);
        } catch (e) {
            commit('user_error', e.message);
        }
    },
    async get_one({commit}, {user_id}) {
        try {
            const result = await get_user(user_id);
            commit('user_loaded', result);
        } catch (e) {
            commit('user_error', e.message);
        }
    },
    async remove({commit}, {user_id}) {
        try {
            const result = await delete_user(user_id);
            commit('user_deleted', result);
        } catch (e) {
            commit('user_error', e.message);
        }
    },
    async update({commit}, {user_id, user_data, instance_id}) {
        try {
            const result = await update_user(user_id, user_data);
        } catch (e) {
            commit('user_error', e.message);
        }
    }
};