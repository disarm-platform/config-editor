<template>
  <el-input
    type="textarea"
    :rows="20"
    placeholder="Please input"
    v-model="formatted_config">
  </el-input>
</template>
<script>
export default {
  props: {
    path: String,
    config: Object
  },
  computed: {
    formatted_config: {
      get() {
        return JSON.stringify(this.config, undefined, 2);
      },
      set (val) {
        this.$emit('change', JSON.parse(val), this.path)
      }
    }
  },
  methods: {

  }
}
</script>

