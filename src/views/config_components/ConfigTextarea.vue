<template>
  <el-input
      type="textarea"
      :rows="20"
      placeholder="Please input"
      v-model="formatted_config">
  </el-input>
</template>

<script>
//
//
//
//
//
//
//
//
//

import {ConfigNodeMixin} from 'src/lib/ConfigNodePlugin';

export default {
  mixin: [ConfigNodeMixin],
  computed: {
    formatted_config: {
      get() {
        return JSON.stringify(this.config, undefined, 2);
      },
      set(val) {
        this.$emit('change', JSON.parse(val), this.path);
      },
    },
  },
  methods: {},
};
</script>

