export interface InstanceState {
    instance_list?: [any]| never[];
    instace?: TInstance | null;
    error: boolean;
}

export interface TInstance {
    name:string,
    _id?:string
}