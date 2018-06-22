import Vue from 'vue';
import {get} from 'lodash';

export default Vue.extend({
  props: {
    config: Object,
    node_name: String,
    validation_result: Object,
  },
  data() {
    return {
      node_config: {},
    };
  },
  created() {
    this.node_config = get(this.config, this.node_name);
    if (!this.node_config) {
      console.warn(`Cannot find configuration for node_name "${this.node_name}}"`, this.config);
    }
  },
  computed: {
    relevant_messages(): any[] {
      if (this.validation_result.length === 0) {
        return [];
      }
      return this.validation_result.edge_messages.filter(message => {
        return message.source_node_name === this.node_name || message.target_node_name === this.node_name;
      })
    }
  }
});
