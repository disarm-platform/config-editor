import { TConfig } from '@locational/config-validation/build/module/lib/config_types/TConfig';
export interface ConfigState {
    config_list?: [any]| never[];
    applets_config?: TConfig | null;
    error: boolean;
}
