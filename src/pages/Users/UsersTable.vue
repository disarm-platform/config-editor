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
                    <el-checkbox :checked="permission(scope,perm)" @change="update_permission(scope,$event)"/>
                </template>
            </el-table-column>
        </el-table>
        <el-button type="text">Save Permissions</el-button>
    </div>
</template>
<script lang="ts">
    import Vue from "vue";
    import _ from "lodash";

    const base_permissions = [
        {
            applet: "irs_monitor",
            type: "read",
            value: "read:irs_monitor"
        },
        {
            applet: "irs_record_point",
            type: "read",
            value: "read:irs_record_point"
        },
        {
            applet: "irs_plan",
            type: "read",
            value: "read:irs_plan"
        },
        {
            applet: "irs_tasker",
            type: "read",
            value: "read:irs_tasker"
        },
        {
            applet: "structure_recorder",
            type: "read",
            value: "read:structure_recorder"
        },
        {
            applet: "data_wizard",
            type: "read",
            value: "read:data_wizard"
        },
        {
            applet: "debug",
            type: "read",
            value: "read:debug"
        },
        {
            applet: "unity_dashboard",
            type: "read",
            value: "read:unity_dashboard"
        },
        {
            applet: "foci",
            type: "read",
            value: "read:foci"
        },
        {
            applet: "config",
            type: "read",
            value: "read:config"
        },
        {
            applet: "seasons",
            type: "read",
            value: "read:seasons"
        },
        {
            applet: "irs_monitor",
            type: "write",
            value: "write:irs_monitor"
        },
        {
            applet: "irs_record_point",
            type: "write",
            value: "write:irs_record_point"
        },
        {
            applet: "irs_plan",
            type: "write",
            value: "write:irs_plan"
        },
        {
            applet: "irs_tasker",
            type: "write",
            value: "write:irs_tasker"
        },
        {
            applet: "structure_recorder",
            type: "write",
            value: "write:structure_recorder"
        },
        {
            applet: "data_wizard",
            type: "write",
            value: "write:data_wizard"
        },
        {
            applet: "debug",
            type: "write",
            value: "write:debug"
        },
        {
            applet: "unity_dashboard",
            type: "write",
            value: "write:unity_dashboard"
        },
        {
            applet: "foci",
            type: "write",
            value: "write:foci"
        },
        {
            applet: "config",
            type: "write",
            value: "write:config"
        },
        {
            applet: "seasons",
            type: "write",
            value: "write:seasons"
        },
        {
            value: 'admin'
        }
    ].map(p => p.value)

    export default Vue.extend({
        name: "users",
        /* props:{
             users_list:Array,
             permissions:Array
         },*/
        data() {
            return {
                permissions: [{}]
            };
        },
        watch: {},
        computed: {
            permissions_list(): string[] {
                /*   let permissions = this.users.reduce(
                     (acc: string[], u): string[] => acc.concat(u.permissions),
                     base_permissions
                   );*/
                return base_permissions;//_.uniq(permissions);
            },
            users() {
                return this.$store.state.user.user_list;
            }
        },
        methods: {
            handleSelectionChange(event: any) {
                console.log(event);
            },

            update_permission(row: any, checked: boolean) {
                if (checked) {
                    // @ts-ignore
                    let instance_id = this.$store.state.instance.instance._id;
                    console.log({user_id: row.row._id, value: row.column.label, instance_id});
                    this.permissions.push(row.column.label);
                    this.$store.dispatch('permission/create',{user_id: row.row._id, value: row.column.label, instance_id})
                } else {
                    // @ts-ignore
                    let instance_id = this.$store.state.instance.instance._id;
                    console.log({user_id: row.row._id, value: row.column.label, instance_id});
                    this.$store.dispatch('permission/remove',{user_id: row.row._id, value: row.column.label, instance_id})
                }
            },
            save_permissions() {
                console.log(this.users);
            },
            permission(row: any, permission: string): boolean {
                // @ts-ignore
                return _.includes(this.users[row.$index].permissions, row.column.label);
            },
            handleEdit() {

            },
            handleDelete() {

            }
        }
    });
</script>
