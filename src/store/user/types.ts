import { DoumaUser } from '@locational/douma-types';
export interface UserState {
    user_list?: [any]| never[];
    user?: DoumaUser | null;
    error: boolean;
}