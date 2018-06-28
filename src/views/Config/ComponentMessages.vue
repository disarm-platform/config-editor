<template>
  <div>
      <div>
        <el-alert
          class="alert"
          v-for="(s, i) in success"
          :key="i"
          :title="s.message"
          type="success">
        </el-alert>
      </div>
      
      <div>
        <el-alert
          class="alert"
          v-for="(w, i) in warnings"
          :key="i"
          :title="w.message"
          type="warning">
        </el-alert>
      </div>

      <div>
        <el-alert
          class="alert"
          v-for="(e, i) in errors"
          :key="i"
          :title="e.message"
          type="error">
        </el-alert>
      </div>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    props: {
      errors: Array,
      warnings: Array,
      success: Array,
    },
  });
</script>

<style scoped>
  .alert {
    margin-bottom: 0.5em;
  }
</style>