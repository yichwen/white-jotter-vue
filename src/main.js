// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

// import maven-editor
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

// import echarts
import 'echarts/theme/macarons.js'

// import element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// import axios
// 设置反向代理，前端请求默认发送到 http://localhost:8443/api
var axios = require('axios')
axios.defaults.baseURL = 'http://localhost:8443/api'
// axios.defaults.withCredentials = true  // 开启 withCredentials 功能让前端能够带上 cookie
// 全局注册，之后可在其他组件中通过 this.$axios 发送数据

const requestHandler = request => {
  const token = store.state.user.token
  if (token) {
    request.headers.Authorization = `Bearer ${token}`
  }
  return request
}

axios.interceptors.request.use(request => requestHandler(request))

Vue.prototype.$axios = axios

// 作用是阻止vue 在启动时生成生产提示
Vue.config.productionTip = false

// use mavon-editor
Vue.use(mavonEditor)

// use element-ui
Vue.use(ElementUI)

// hook to check every route
router.beforeEach((to, from, next) => {
  // init menus if route starts from '/admin'
  if (store.state.user && store.state.user.token && to.path.startsWith('/admin')) {
    initAdminMenu(router, store, to)
  }
  // if the route require authorization
  if (to.meta.requireAuth) {
    // proceed if user already login
    if (store.state.user.token) {
      next()
    } else {
      // else go to login page
      // next({
      //   name: 'Login',
      //   query: {
      //     redirect: to.fullPath
      //   }
      // })
      router.replace(`/login?${to.fullPath}`)
    }
  } else {
    // if no require authorization, proceed
    next()
  }
})

const formatRoutes = (routes) => {
  let fmtRoutes = []
  routes.forEach(route => {
    if (route.children) {
      route.children = formatRoutes(route.children)
    }
    let fmtRoute = {
      path: route.path,
      component: resolve => {
        require(['./components/admin/' + route.component + '.vue'], resolve)
      },
      name: route.name,
      nameZh: route.nameZh,
      iconCls: route.iconCls,
      meta: {
        requireAuth: true
      },
      children: route.children
    }
    fmtRoutes.push(fmtRoute)
  })
  return fmtRoutes
}

const initAdminMenu = (router, store, to) => {
  if (store.state.adminMenus.length > 0) {
    return
  }
  axios.get('/menu').then(resp => {
    if (resp && resp.status === 200) {
      const additionalRoutes = formatRoutes(resp.data.result)
      // if (store.state.loadedRoutes.length === 0) {
      //   const loadedRoutes = []
      //   additionalRoutes.forEach(route => {
      //     // to route to router without duplicate route
      //     if (route.path === '/admin') {
      //       route.children.forEach(childRoute => {
      //         if (childRoute.path !== '/admin/dashboard') {
      //           router.addRoute('Admin', childRoute)
      //           loadedRoutes.push(childRoute)
      //         }
      //       })
      //     }
      //   })
      //   console.log(loadedRoutes)
      //   store.commit('routesLoaded', loadedRoutes)
      // }
      store.commit('initAdminMenu', additionalRoutes)
      // since the axios is async, so required set path again after routes loaded
      // if (to.fullPath !== '/admin/dashboard') {
      //   router.replace(to.fullPath)
      // }
    }
  })
}

// export const removeRoutes = (routes) => {
//   console.log(routes)
//   // this version does not have removeRoute() function
//   routes.forEach(route => {
//     router.removeRoute(route.name)
//   })
// }

/* eslint-disable no-new */
new Vue({
  el: '#app', // el 属性提供一个在页面上已存在的 DOM 元素作为 Vue 对象的挂载目标
  router,
  store,
  components: { App }, // 表示该对象包含的 Vue 组件
  template: '<App/>'
})
