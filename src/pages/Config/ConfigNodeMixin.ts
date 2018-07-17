import Vue from 'vue';
import {cloneDeep, get} from 'lodash';
import {TUnifiedResponse} from '@locational/config-validation/build/module/lib/TUnifiedResponse';
import {TConfig} from '@locational/config-validation/build/module/lib/config_types/TConfig';

export default Vue.extend({
  props: {
    path_name: String,
    config: Object as () => TConfig,
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

        if (got) {
          this.node_config = cloneDeep(got);
          this.make_backup();
        }
      },
      deep: true,
    },
  },
  created() {
    const got = get(this.config, this.path_name);

    if (got) {
      this.node_config = cloneDeep(got);
      this.make_backup();
    }
  },
  methods: {
    reset() {
      this.node_config = cloneDeep(this.backup_config);
    },
    make_backup() {
      const got = get(this.config, this.path_name);
      this.backup_config = cloneDeep(got);
    },
    emit_change() {
      this.$emit('change', this.node_config);
    },
  },
});
