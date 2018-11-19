<template>
  <div>
    <el-table
        ref="multipleTable"
        :data="users"
        style="width: 100%"
    >
      <el-table-column
          width="120"
          fixed
          label="Operations">
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="handleEdit(scope)">
            <i class="el-icon-edit"></i>
          </el-button>
          <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope)">
            <i class="el-icon-delete"></i>
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
          property="username"
          fixed
          label="Name"
          width="120">
      </el-table-column>
      <el-table-column
          v-for="(instance) in instances"
          v-bind:key="instance._id"
          :property="instance._id"
          :label="instance.name"
      >
        <template slot-scope="scope">
          <el-tag
              :key="tag._id"
              v-for="tag in filtered_permissions(scope)"
              closable
              size="mini"
              :disable-transitions="false"
              @close="handleDelete(tag)">
            {{tag.value}}
          </el-tag>
          <el-button class="button-new-tag" size="mini" @click="showInput(scope)">+</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'users',
  props: {
    base_permissions: () => [],
  },
  data() {
    return {
      dynamicTags: ['Tag 1', 'Tag 2', 'Tag 3'],
    };
  },
  created() {
    this.$store.dispatch('permission/get');
  },
  computed: {
    permissions_string_list(): string[] {
      return this.base_permissions.map((p: any) => p.value);
    },
    permissions(): any {
      return this.$store.state.permission.permission_list;
    },
    instances(): any {
      return this.$store.state.instance.instance_list;
    },
    users(): any {
      return this.$store.state.user.user_list;
    },
  },
  methods: {
    update_permission(row: any, checked: boolean) {
      const instance_id = this.$store.state.instance.instance._id;
      const permission = {
        user_id: row.row._id,
        value: row.column.label,
        instance_id,
      };
      if (checked) {
        this.$store.dispatch('permission/create', permission);
      } else {
        this.$store.dispatch('permission/remove', permission);
      }
    },
    save_permissions() {
      console.log(this.users);
    },
    filtered_permissions(cell: any): boolean {
      return this.permissions
        .filter((perm: any) => perm.user_id === cell.row._id)
        .filter((perm: any) => perm.instance_id === cell.column.property);
      // .map(perm => perm.value)
    },
    handleEdit() {
      console.log('handleEdit: currently a noop');
    },
    handleDelete(permission: any) {
      try {
        const result = this.$store.dispatch('permission/remove', permission);
        this.$store.dispatch('permission/get');
      } catch (e) {
        console.log(e);
      }
    },
    showInput(data: any) {
      this.$emit('show_input', {
        user_id: data.row._id,
        instance_id: data.column.property,
      });
    },
  },
});
</script>

<style scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>