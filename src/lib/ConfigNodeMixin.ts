import Vue from 'vue';
import {get} from 'lodash';
import {TCustomEdgeResponse} from '@locational/config-validation/build/main/lib/TCustomEdgeResponse';
import {TUnifiedResponse} from '@locational/config-validation/build/module/lib/TUnifiedResponse';
import {TStandardEdgeResponse} from '@locational/config-validation/build/module/lib/TStandardEdgeResponse';
import {TConfig} from '@locational/config-validation/build/module/lib/config_types/TConfig';

export default Vue.extend({
  props: {
    config: Object as () => TConfig,
    node_name: String,
    validation_result: Object as () => TUnifiedResponse,
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
    relevant_messages(): TStandardEdgeResponse[] {
      return this.validation_result.edge_messages.filter((message) => {
        return message.source_node_name === this.node_name || message.target_node_name === this.node_name;
      });
    },
  },
});
