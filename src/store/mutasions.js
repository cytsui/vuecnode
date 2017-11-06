const UPDATE_TOPIC = 'UPDATE_TOPIC'
const TOGGLE_LOADINGMODAL = 'TOGGLE_LOADINGMODAL'
const UPDATE_USER = 'UPDATE_USER'

export default {
  [UPDATE_TOPIC](state, payload) {
    state.topicData = payload.topicData
  },

  [TOGGLE_LOADINGMODAL](state, payload) {
    state.loadingModal = payload.loadingModal
  },

  [UPDATE_USER](state, payload) {
    state.user = payload.user
  }
}
