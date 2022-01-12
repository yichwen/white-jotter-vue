import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'

Vue.use(Router)

export default new Router({
  // 这里可以切换到 History 模式
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Default',
      redirect: '/home',
      component: Home
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      // home 页面并不需要被访问
      redirect: '/index',
      children: [
        {
          path: '/index',
          name: 'AppIndex',
          component: () => import('../components/home/AppIndex')
        },
        {
          path: '/jotter',
          name: 'Jotter',
          component: () => import('../components/jotter/Articles')
        },
        {
          path: '/jotter/article',
          name: 'Article',
          component: () => import('../components/jotter/ArticleDetails')
        },
        {
          path: '/library',
          name: 'LibraryIndex',
          component: () => import('../components/library/LibraryIndex')
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../components/Login')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../components/Register')
    },
    {
      path: '/admin',
      name: 'Admin',
      component: () => import('../components/admin/AdminIndex'),
      meta: {
        requireAuth: true
      },
      children: [
        {
          path: '/admin/dashboard',
          name: 'Dashboard',
          component: () => import('../components/admin/dashboard/admin/index'),
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/admin/user/profile',
          name: 'Profile',
          component: () => import('../components/admin/user/UserProfile'),
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/admin/user/role',
          name: 'Role',
          component: () => import('../components/admin/user/Role'),
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/admin/content/book',
          name: 'BookManagement',
          component: () => import('../components/admin/content/BookManagement'),
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/admin/content/banner',
          name: 'BannerManagement',
          component: () => import('../components/admin/content/BannerManagement'),
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/admin/content/article',
          name: 'ArticleManagement',
          component: () => import('../components/admin/content/ArticleManagement'),
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/admin/content/editor',
          name: 'Editor',
          component: () => import('../components/admin/content/ArticleEditor'),
          meta: {
            requireAuth: true
          }
        }
      ]
    },
    {
      path: '*',
      component: () => import('../components/pages/Error404')
    }
  ]
})
