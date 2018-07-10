import Vue from 'vue';
import {cloneDeep, get} from 'lodash';
import {TUnifiedResponse} from '@locational/config-validation/build/module/lib/TUnifiedResponse';
import {TStandardEdgeResponse} from '@locational/config-validation/build/module/lib/TStandardEdgeResponse';
import {TConfig} from '@locational/config-validation/build/module/lib/config_types/TConfig';

/**
 * All of these end up with a data property called `node_config` that they can mutate,
 * OR they can override a `tell_me` method which returns the value of the `node_config`
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
      backup_config: {},
    };
  },
  watch: {
    config: {
      handler() {
        const got = get(this.config, this.path_name);

        if (!got) {
          console.warn(`Cannot find configuration for path_name "${this.path_name}"`, this.config);
        } else {
          this.node_config = cloneDeep(got);
          this.make_backup();
        }
      },
      deep: true,
    },
  },
  created() {
    const got = get(this.config, this.path_name);

    if (!got) {
      console.warn(`Cannot find configuration for path_name "${this.path_name}"`, this.config);
    } else {
      this.node_config = cloneDeep(got);
      this.make_backup();
    }
  },
  computed: {
    node_config_string(): string | undefined {
      try {
        return JSON.stringify(this.node_config, undefined, 4);
      } catch (e) {
        return undefined;
      }
    },
    relevant_messages(): TStandardEdgeResponse[] {
      return this.validation_result.edge_messages.filter((message) => {
        return message.source_node_name === this.node_name || message.target_node_name === this.node_name;
      });
    },
  },
  methods: {
    set_node_config_from_string(val: string): void {
      try {
        this.node_config = JSON.parse(val);
        this.emit_change();
      } catch (e) {}
    },
    tell_me() {
      return this.node_config;
    },
    reset() {
      this.node_config = cloneDeep(this.backup_config);
    },
    make_backup() {
      const got = get(this.config, this.path_name);
      this.backup_config = cloneDeep(got);
    },
    emit_change() {
      this.$emit('change');
    },
  },
});
