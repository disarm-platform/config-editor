<template>
    <el-autocomplete
            class="input-new-tag"
            v-if="inputVisible"
            ref="saveTagInput"
            size="mini"
            v-model="state"
            :fetch-suggestions="querySearch"
            @select="handleSelect"
            @keyup.enter.native="handleSelect"
            placeholder="Please input"
            :trigger-on-focus="true">
    </el-autocomplete>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    base_permissions: () => [],
  },
  name: 'NewPermission',
  data() {
    return {
      permission_input: {},
      inputVisible: false,
      inputValue: '',
      state: '',
    };
  },
  methods: {
    show_input(input: any) {
      this.inputVisible = true;
      this.permission_input = input;
    },
    async handleSelect(item: any) {
      const permission = { value: item.value, ...this.permission_input };
      try {
        const result = await this.$store.dispatch(
          'permission/create',
          permission,
        );
        this.$store.dispatch('permission/get');
      } catch (e) {
        console.log(e);
      }
    },
    querySearch(query: any, cb: any) {
      const results = query
        ? this.base_permissions.filter(this.createFilter(query))
        : this.base_permissions;
      const top5 = results.slice(0, 5);
      console.log(JSON.stringify(top5));
      return cb(top5); // number of things returned
    },
    createFilter(query: any) {
      return (perm: any) => {
        return perm.value.toLowerCase().includes(query.toLowerCase());
      };
    },
  },
});
</script>

<style scoped>
.input-new-tag {
  margin-left: 10px;
  vertical-align: bottom;
  width: 450px;
}
</style>