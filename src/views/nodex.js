import Aggregations from './config_components/Aggregations';
import Applets from './config_components/Applets';
import Decorators from './config_components/Decorators';
import Form from './config_components/Form';
import Instance from './config_components/Instance';
import MapFocus from './config_components/MapFocus';
import SpatialHierarchy from './config_components/SpatialHierarchy';
import Validations from './config_components/Validations';

export const component_defs = [
  {name: 'Instance', node_name: 'instance', component: Instance},
  {name: 'Applets', node_name: 'applets', component: Applets},
  {name: 'SpatialHierarchy', node_name: 'spatial_hierarchy', component: SpatialHierarchy},
  {name: 'MapFocus', node_name: 'map_focus', component: MapFocus},
  {name: 'Form', node_name: 'form', component: Form},
  {name: 'Aggregations', node_name: 'aggregations', component: Aggregations},
  {name: 'Decorators', node_name: 'decorators', component: Decorators},
  {name: 'Validations', node_name: 'validations', component: Validations},
];


export const component_list = component_defs.reduce((acc, c) => {
  acc[c.name] = c.component;
  return acc;
}, {});
