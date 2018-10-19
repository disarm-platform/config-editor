<template>
    <div>
        <el-button type="text" @click="dialogFormVisible = true">Add User</el-button>

        <el-dialog title="New User Details" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="Name" :label-width="formLabelWidth">
                     <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Username" :label-width="formLabelWidth">
                    <el-input v-model="form.username" autocomplete="off"></el-input>
                </el-form-item>
                 <el-form-item label="Password" :label-width="formLabelWidth">
                    <el-input v-model="form.password" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">Cancel</el-button>
                <el-button type="primary" @click="save">Save</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script  lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "users",
  data() {
    return {
      dialogFormVisible: false,
      form: {
        name: "",
        username: "",
        password: ""
      },
      formLabelWidth: "120px"
    };
  },
    methods:{
      save(){
          const instance_id = this.$store.state.instance.instance._id;
          this.dialogFormVisible = false
          this.$emit('save',{user_data:this.form,instance_id})
      }
    }
});
</script>
