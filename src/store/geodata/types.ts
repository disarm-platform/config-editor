import {
    TGeodataLayer,
    TGeodataLayerDefinition,
  } from '@locational/geodata-support/build/module/config_types/TGeodata';

export interface GeodataState {
    layer_list?: [any]| never[];
    geodata_layer?: TGeodataLayer | null;
    error: boolean;
}
