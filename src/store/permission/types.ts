export interface PermisionState {
    permission_list?: [any]| never[];
    permission?: any | null;
    error: boolean;
}