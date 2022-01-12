import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      username: localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(localStorage.getItem('user' || '[]')).username,
      token: localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(localStorage.getItem('user' || '[]')).token
    },
    adminMenus: []
    // loadedRoutes: []
  },
  mutations: {
    login (state, user) {
      state.user = user
      localStorage.setItem('user', JSON.stringify(user))
    },
    logout (state) {
      state.user = {
        username: '',
        token: ''
      }
      // removeRoutes(state.loadedRoutes)
      // state.loadedRoutes = []
      state.adminMenus = []
      localStorage.clear()
    },
    initAdminMenu (state, adminMenus) {
      state.adminMenus = adminMenus
    }
    // routesLoaded (state, loadedRoutes) {
    //   state.loadedRoutes = loadedRoutes
    // }
  }
})
