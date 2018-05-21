import Vue from 'vue';
import VueRouter from 'vue-router';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import Breadcrumb from './components/breadcrumb';

import App from './app.vue';
import routes from './routes';
import './style.scss';

Vue.use(VueRouter);
Vue.use(ElementUI);

// register dashboard components
Vue.component('db-breadcrumb', Breadcrumb);

export const router = new VueRouter({
  routes,
  mode: 'hash',
  linkActiveClass: 'active'
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => { return record.path !== '/login'; })) {
    let user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      next({path: '/login'});
    }
  }
  next();
});

new Vue({
  render: h => h(App),
  router
}).$mount('#app');
