import _Vue from 'vue'; // <-- notice the changed import
import {get} from 'lodash';

// export type PluginFunction<T> = (Vue: typeof _Vue, options?: T) => void;
export function ConfigNodePlugin(Vue: typeof _Vue, options?: any): void {
  Vue.prototype.$configNode = function() {
    console.log('config, path', this.config, this.node_name);
    return get(this.config, this.node_name);
  };
}

export const ConfigNodeMixin = {
  props: {
    config: Object,
    node_name: String,
  },
  created() {
    console.log('created', this);
  },
};
