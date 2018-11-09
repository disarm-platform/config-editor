import { DoumaReadPermissions } from '@locational/douma-types';
import { DoumaWritePermissions } from '@locational/douma-types';

export interface PermissionState {
    permission_list?: Array<DoumaReadPermissions | DoumaWritePermissions>;
    permission?: DoumaReadPermissions | DoumaWritePermissions;
    error: boolean;
}

