import Vue from 'vue'
import Vuex from 'vuex'
import storage from '../utils/storage'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    toolBar : true,
    allTableData:[],
    allColumnData:[],
  },
  getters: {
    getAllTableData(state){
      state.allTableData=storage.get("allTableData");
      return state.allTableData;
    },
    getAllColumnData(state){
      state.allTableData=storage.get("allColumnData");
      console.log(this.allColumnData)
      return state.allColumnData;
    }
  },
  mutations: {
    changeToolBar(state) {
      state.toolBar = !state.toolBar
      state.toolBar = !state.toolBar
    },
    setAllTableData(state,allTableData){
      state.allTableData=allTableData
      
    },
    setAllColumnData(state,allColumnData){
      state.allColumnData=allColumnData;
      console.log(this.allColumnData)
    }
  },
  actions: {
  },
  modules: {
  }
})
