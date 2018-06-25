import Vue from 'vue';
import {cloneDeep, get} from 'lodash';
import {TUnifiedResponse} from '@locational/config-validation/build/module/lib/TUnifiedResponse';
import {TStandardEdgeResponse} from '@locational/config-validation/build/module/lib/TStandardEdgeResponse';
import {TConfig} from '@locational/config-validation/build/module/lib/config_types/TConfig';


/**
 * All of these end up with a data property called `node_config`,
 * and they need to emit a `change` event with the updated `node_config`
 * as it is changed.
 */
export default Vue.extend({
  props: {
    node_name: String,
    path_name: String,

    config: Object as () => TConfig,
    validation_result: Object as () => TUnifiedResponse,
  },
  data() {
    return {
      node_config: {},
    };
  },
  created() {
    const got = get(this.config, this.path_name);

    if (!got) {
      console.warn(`Cannot find configuration for path_name "${this.path_name}"`, this.config);
    } else {
      this.node_config = cloneDeep(got);
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
