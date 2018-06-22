import Vue from 'vue';
import {get} from 'lodash';

export default Vue.extend({
  props: {
    config: Object,
    node_name: String,
  },
  data() {
    return {
      node_config: {},
    };
  },
  created() {
    this.node_config = get(this.config, this.node_name);
    if (!this.node_config) console.warn(`Cannot find configuration for node_name "${this.node_name}}"`, this.config);
  },
});
