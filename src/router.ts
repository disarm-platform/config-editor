import Vue from 'vue';
import Router from 'vue-router';
import Editor from './Editor.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'editor',
      component: Editor,
    },
  ],
});
