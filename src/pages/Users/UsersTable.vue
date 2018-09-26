<template>
    <div>
        <el-table
            ref="multipleTable"
            :data="users"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
                property="name"
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
import _ from 'lodash'
export default Vue.extend({
  name: "users",
  data() {
    return {
      users: [
        {
          name: "Tom1",
          permissions:['irs_monitor:read','plan:write','plan:read','config:read']
        },
        {
          name: "Tom2",
          permissions:['irs_monitor:read','plan:write','plan:read']
        },
        {
          name: "Tom3",
          permissions:['irs_monitor:read','plan:write','plan:read','config-write']
        },
        {
          name: "Tom4",
          permissions:['irs_monitor:read','plan:write','plan:read']
        },
        {
          name: "Tom5",
          permissions:['irs_monitor:read','plan:write','plan:read']
        },
        {
          name: "Tom6",
          permissions:['irs_monitor:read','plan:write','plan:read']
        },
        {
          name: "Tom",
          permissions:['irs_monitor:read','plan:write','plan:read']
        }
      ]
    };
  },
  computed:{
      permissions_list():string[]{
        let permissions = this.users
        .reduce((acc:string[],u):string[] =>  acc.concat(u.permissions),[])
        return _.uniq(permissions)
      },

  },
  methods:{
      handleSelectionChange(event:any){
          console.log(event)
      },
      update_permission(row:any,checked:boolean){
          if(checked){
              this.users[row.$index].permissions.push(row.column.label)
          }else{
              this.users[row.$index].permissions.splice(this.users[row.$index].permissions.indexOf(row.column.label),1)
          }
      },
      permission(row:any, permission:string):boolean{
          return _.includes(this.users[row.$index].permissions,row.column.label)
      }
  }
});
</script>
