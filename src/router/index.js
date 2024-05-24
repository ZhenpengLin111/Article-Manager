import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores'

// createRouter 创建路由实例
// 配置 history 模式
// 1. history模式：createWebHistory 地址栏不带#
// 2. hash模式：createHashHistory 地址栏带#

// console.log(import.meta.env.DEV)
// vite 中的环境变量 import.meta.env.BASE_URL 就是 vite.config.js 中的base 配置项
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login',
    component: () => import('@/views/login/LoginPage.vue'),
    meta: { title: 'Login | ArticleManager' }  
  }, // 登录页
    {
      path: '/',
      component: () => import('@/views/layout/LayoutContainer.vue'),
      redirect: '/article/manage',
      children: [
        {
          path: '/article/manage',
          component: () => import('@/views/article/ArticleMange.vue')
        },
        {
          path: '/article/channel',
          component: () => import('@/views/article/ArticleChannel.vue'),
          meta: { title: 'Article Channel | ArticleManager' } 
        },
        {
          path: '/user/profile',
          component: () => import('@/views/user/UserProfile.vue'),
          meta: { title: 'User Profile | ArticleManager' } 
        },
        {
          path: '/user/avatar',
          component: () => import('@/views/user/UserAvatar.vue'),
          meta: { title: 'User Avatar | ArticleManager' }
        },
        {
          path: '/user/password',
          component: () => import('@/views/user/UserPassword.vue'),
          meta: { title: 'User Password | ArticleManager' } 
        }
      ]
    }
  ]
})

// 登录访问拦截 => 默认是直接放行的
// 根据返回值决定，是放行还是拦截
// 返回值：
// 1. undefined / true 直接放行
// 2. false 拦回from的地址页面
// 3. 具体路径 或 路由对象 拦截到对应的地址
//    '/login'   { name: 'login'}
router.beforeEach((to) => {
  // set document's title base on path name
  document.title = to.meta.title || 'ArticleManager'
  // 如果没有token，且访问的是非登录页，拦截到登录，其他情况正常放行
  const useStore = useUserStore()
  if (!useStore.token && to.path !== '/login') return '/login'
})

export default router
