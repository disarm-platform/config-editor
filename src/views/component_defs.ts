import {VueConstructor} from 'vue/types/vue';

import Aggregations from './config_components/Aggregations.vue';
import Decorators from './config_components/Decorators.vue';
import Form from './config_components/Form.vue';
import Instance from './config_components/Instance.vue';
import MapFocus from './config_components/MapFocus.vue';
import SpatialHierarchy from './config_components/SpatialHierarchy.vue';
import Validations from './config_components/Validations.vue';
import IrsMonitor from './config_components/IrsMonitor.vue';
import IrsPlan from './config_components/IrsPlan.vue';
import IrsRecordPoint from './config_components/IrsRecordPoint.vue';
import IrsTasker from './config_components/IrsTasker.vue';

export interface ComponentDefinition {
  display_name: string;
  component_name: string;
  node_name: string;
  component: VueConstructor;
}

export interface ComponentList {
  [k: string]: VueConstructor;
}

export const component_defs: ComponentDefinition[] = [
  {
    display_name: 'Instance',
    component_name: 'Instance',
    node_name: 'instance',
    component: Instance,
  },
  {
    display_name: 'Spatial Hierarchy'
    , component_name: 'SpatialHierarchy'
    , node_name: 'spatial_hierarchy'
    , component: SpatialHierarchy,
  },
  {
    display_name: 'Map Focus'
    , component_name: 'MapFocus'
    , node_name: 'map_focus'
    , component: MapFocus,
  },
  {
    display_name: 'Form',
    component_name: 'Form',
    node_name: 'form',
    component: Form,
  },
  {
    display_name: 'Aggregations',
    component_name: 'Aggregations',
    node_name: 'aggregations',
    component: Aggregations,
  },
  {
    display_name: 'Decorators',
    component_name: 'Decorators',
    node_name: 'decorators',
    component: Decorators,
  },
  {
    display_name: 'Validations',
    component_name: 'Validations',
    node_name: 'validations',
    component: Validations,
  },
  // TODO: Give node_name for applets below as path, eg. irs_monitor insteads of applets.irs_monitor
  {
    display_name: 'Monitor',
    component_name: 'IrsMonitor',
    node_name: 'applets.irs_monitor',
    component: IrsMonitor,
  },
  {
    display_name: 'Plan',
    component_name: 'IrsPlan',
    node_name: 'applets.irs_plan' +
    '', component: IrsPlan,
  },
  {
    display_name: 'Record (point)',
    component_name: 'IrsRecordPoint',
    node_name: 'applets.irs_record_point',
    component: IrsRecordPoint,
  },
  {
    display_name: 'Tasker',
    component_name: 'IrsTasker',
    node_name: 'applets.irs_tasker',
    component: IrsTasker,
  },
];


export const component_list: ComponentList = component_defs.reduce((acc, c: ComponentDefinition) => {
  acc[c.component_name] = c.component;
  return acc;
}, {} as ComponentList);
