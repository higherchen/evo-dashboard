/*eslint-disable */
// 通用
import Abstract from './pages/common/abstract';
import NotFound from './pages/common/404';
import Welcome from './pages/common/welcome';
import Login from './pages/common/login';

import Page1 from './pages/home/page_1';
import Page2 from './pages/home/page_2';
import Page3 from './pages/home/page_3';

let routes = [
  {
    path: '/login',
    component: Login,
    name: '登录',
    meta: {
      hidden: true
    }
  },
  {
    path: '/404',
    component: NotFound,
    name: '404'
  },
  {
    path: '/',
    component: Welcome,
    name: 'welcome'
  },
  {
    path: '/home',
    component: Abstract,
    name: '首页',
    children: [
      {
        path: 'page1',
        component: Page1,
        name: '页面-1'
      },
      {
        path: 'page2',
        component: Page2,
        name: '页面-2'
      },
      {
        path: 'page3',
        component: Page3,
        name: '页面-3'
      }
    ]
  },
  {
    path: '*',
    redirect: {path: '/404'}
  }
];
// debugger;
let menuCount = routes.length;
routes[menuCount - 2].children.forEach(route => {
  if (route.children) {
    if (!route.meta) route.meta = {};
    route.meta.children = route.children;
  }
});
export default routes;
