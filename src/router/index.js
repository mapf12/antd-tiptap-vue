import * as VueRouter from 'vue-router';

const routes = [
  {
    path: '/myEditor',
    component: () => import('@/views/myEditor/index.vue')
  },
  {
    path: '/',
    name: 'login1',
    redirect: '/myEditor',
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../views/errors/NotFound.vue'),
  },
];

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const routerApp = VueRouter.createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  // base: import.meta.env.VITE_BASE_PATH,
  // mode: 'history',
  history: VueRouter.createWebHistory(import.meta.env.VITE_BASE_PATH),
  routes, // `routes: routes` 的缩写
});

export default routerApp;
