<template>
    <div>
        <new-user/>
        <users-table/>
    </div>
</template>
<script  lang="ts">
import Vue from 'vue';
import UsersTable from './UsersTable.vue';
import NewUser from './NewUser.vue';

export default  Vue.extend({
  name: "users",
  components:{UsersTable, NewUser},
  data() {
      return {}
  }
});
</script>
