import { TConfig } from '@locational/config-validation/build/module/lib/config_types/TConfig';
import { DoumaUser } from '@locational/douma-types';
import { TUnifiedResponse } from '@locational/config-validation/build/module/lib/TUnifiedResponse';

export enum ValidationStatus {
    NotValidated = 'Not validated',
    Valid = 'Valid',
    Invalid = 'Invalid',
  }

export interface RootState {
    applets_config: TConfig | null;
    instance_id_and_version: {
      config_id: string,
      config_version: string,
    } | null;
    user: DoumaUser | null;
    creating_new_config: boolean;
    validation_result: TUnifiedResponse | null;
    validation_status: ValidationStatus;
  }
