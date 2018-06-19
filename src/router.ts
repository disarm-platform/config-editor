import Vue from 'vue';
import Router from 'vue-router';
import Config from './views/Config.vue';
import Geodata from './views/Geodata.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'geodata',
      component: Geodata,
    },
    {
      path: '/config',
      name: 'config',
      component: Config,
    },
  ],
});
