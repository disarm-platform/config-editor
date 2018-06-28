<template>
  <div>

    <el-checkbox v-model="node_config.metadata.show">Show metadata page</el-checkbox>

    <h5>Optional fields</h5>

    <ul>
      <li v-for="(field, index) in node_config.metadata.optional_fields" :key="index">
        {{field}}
        <el-button type="text" icon="el-icon-close" @click="remove(index)"></el-button>
      </li>
    </ul>

    <el-form>
      <el-form-item label="Add a custom field">
        <el-input placeholder="Add a custom field" v-model="field"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="add">Add field</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script lang="ts">
  import ConfigNodeMixin from '../ConfigNodeMixin';

  export default ConfigNodeMixin.extend({
    data() {
      return {
        field: ''
      }
    },
    methods: {
      add(e: Event) {
        e.preventDefault()
        this.node_config.metadata.optional_fields.push(this.field);
        this.field = ''
      },
      remove(index) {
        this.node_config.metadata.optional_fields.splice(index, 1)
      }
    }
  });
</script>

<style scoped>

</style>