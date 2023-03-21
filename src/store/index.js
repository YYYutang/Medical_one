import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    toolBar : true
  },
  getters: {
  },
  mutations: {
    changeToolBar(state) {
      state.toolBar = !state.toolBar
      state.toolBar = !state.toolBar
    }
  },
  actions: {
  },
  modules: {
  }
})
