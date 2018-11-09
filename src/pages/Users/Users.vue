<template>
    <div>
        <new-user @save="create_user"/>
        <users-table />
    </div>
</template>
<script lang="ts">
    import Vue from "vue";
    import UsersTable from "./UsersTable.vue";
    import NewUser from "./NewUser.vue";

    export default Vue.extend({
        name: "users",
        components: {UsersTable, NewUser},
        data() {
            return {};
        },
        mounted() {
            this.$store.dispatch("user/get")
        },
        computed:{
        },
        methods: {
            async create_user(user_data) {
                await this.$store.dispatch("user/create", user_data);
                this.$store.dispatch("user/get")
            }
        }
    });
</script>
