export interface PermissionState {
    permission_list?: [any]| never[];
    permission?: any | null;
    error: boolean;
}