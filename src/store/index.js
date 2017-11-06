import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutasions.js'
import actions from './actions.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    topicData: null,
    loadingModal: false,
    accessToken: 'cb382618-a01a-47cd-a5ef-e3c9ccd425d1'
  },

  mutations,
  actions
})
