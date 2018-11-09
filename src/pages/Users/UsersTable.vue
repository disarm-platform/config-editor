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
                    v-for="(instance) in instances"
                    v-bind:key="instance._id"
                    :property="instance._id"
                    :label="instance.name"
            >
                <template slot-scope="scope">
                    <el-tag
                            :key="tag"
                            v-for="tag in dynamicTags"
                            closable
                            size="mini"
                            :disable-transitions="false"
                            @close="handleClose(tag)">
                        {{tag}}
                    </el-tag>
                    <el-input
                            class="input-new-tag"
                            v-if="inputVisible"
                            v-model="inputValue"
                            ref="saveTagInput"
                            size="mini"
                            @keyup.enter.native="handleInputConfirm"
                            @blur="handleInputConfirm"
                    >
                    </el-input>
                    <el-button v-else class="button-new-tag" size="mini" @click="showInput">+</el-button>

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
            value: "admin"
        }
    ].map(p => p.value);

    export default Vue.extend({
        name: "users",
        data() {
            return {
                dynamicTags: ['Tag 1', 'Tag 2', 'Tag 3'],
                inputVisible: false,
                inputValue: ''
            };
        },
        created(){
            this.$store.dispatch("permission/get",)
        },
        computed: {
            permissions_string_list(): string[] {
                return base_permissions;
            },
            permissions(){
                return this.$store.state.permission.permission_list;
            },
            instances(){
              return this.$store.state.instance.instance_list
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
                let instance_id = this.$store.state.instance.instance._id;
                let permission = {user_id: row.row._id, value: row.column.label, instance_id};
                if (checked) {
                    this.$store.dispatch("permission/create",permission);
                } else {
                    this.$store.dispatch("permission/remove",permission);
                }
            },
            save_permissions() {
                console.log(this.users);
            },
            permission(row: any): boolean {

                const checked = this.permissions
                console.log(checked,row.column.label,)
                return checked;
            },
            handleEdit() {

            },
            handleDelete() {

            },
            handleClose(tag) {
                this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
            },

            showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },

            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                    this.dynamicTags.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';
            }
        }
    });
</script>
<style>
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
    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }
</style>