
import { ActionTree } from 'vuex';
import {
    create_user,
    get_user,
    get_users,
    update_user,
    delete_user
} from '@/lib/user'
import { UserState } from './types';

import { RootState } from '../types';


export const actions: ActionTree<UserState, RootState> = {
    create({ commit }): any {
    },
    get({ commit }): any {

    },
    get_one({ commit }): any {

    },
    remove({ commit }): any {

    },
    update({ commit }): any {

    }
};