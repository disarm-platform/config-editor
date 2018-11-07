<template>
    <div>
        <el-table
            ref="multipleTable"
            :data="users"
            style="width: 100%"
            @selection-change="handleSelectionChange">
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
               v-for="(perm) in permissions_list"
               v-bind:key="perm"
               :property="perm"
               :label="perm"
                >
                <template slot-scope="scope">
                     <el-checkbox :checked="permission(scope,perm)" @change="update_permission(scope,$event)" />
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script  lang="ts">
import Vue from "vue";
import _ from "lodash";
const base_permissions = [
  "irs_monitor:read",
  "irs_record_point:read",
  "irs_plan:read",
  "irs_tasker",
  "structure_recorder:read",
  "data_wizard:read",
  "debug:read",
  "config:read",
  "irs_monitor:write",
  "irs_record_point:write",
  "irs_plan:write",
  "irs_tasker:write",
  "structure_recorder:write",
  "data_wizard:write",
  "debug:write",
  "config:write"
];
export default Vue.extend({
  name: "users",
 /* props:{
      users_list:Array,
      permissions:Array
  },*/
  data() {
    return {
        permissions:[]
    };
  },
    watch:{
      ''
    },
  computed: {
    permissions_list(): string[] {
   /*   let permissions = this.users.reduce(
        (acc: string[], u): string[] => acc.concat(u.permissions),
        base_permissions
      );*/
      return base_permissions//_.uniq(permissions);
    },
      users(){
        return this.$store.state.user.user_list
      }
  },
  methods: {
    handleSelectionChange(event: any) {
      console.log(event);
    },
    
    update_permission(row: any, checked: boolean) {
      if (checked) {
        // @ts-ignore
          let instance_id = this.$store.state.instance.instance._id
          console.log({user_id:row.row._id,value:row.column.label,instance_id})
        this.permissions.push(row.column.label);
      } else {
        // @ts-ignore

      }
    },
      save_permissions(){
        console.log(this.users)
      },
    permission(row: any, permission: string): boolean {
      // @ts-ignore
      return _.includes(this.users[row.$index].permissions, row.column.label);
    },
    handleEdit(){

    },
    handleDelete(){

    }
  }
});
</script>
