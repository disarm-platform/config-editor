import Vue from 'vue';
import Router from 'vue-router';
import Editor from '@/pages/Editor.vue';
import Login from '@/pages/Login.vue';
import store from '@/store';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'editor',
      component: Editor,
      beforeEnter(to, from , next) {
        if (!store.state.user) {
          return next('/login');
        }
        next();
      },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter(to, from, next) {
        if (store.state.user) {
          return next(false);
        }
        next();
      },
    },
  ],
});
