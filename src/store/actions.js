import router from '@/router'
import { getTopicDetail, verifyAtk } from '@/actions/'

export default {
  doGetTopicDetail({ commit, state }, topicID) {
    commit('TOGGLE_LOADINGMODAL', {
      loadingModal: true
    })

    getTopicDetail(topicID).then(res => {
      if (res.success) {
        commit('UPDATE_TOPIC', {
          topicData: res.data
        })
        commit('TOGGLE_LOADINGMODAL', {
          loadingModal: false
        })
        router.push(`/topic/${topicID}`)
      }
    })
  },

  submitSignIn({ commit, state }, atk) {
    commit('TOGGLE_LOADINGMODAL', {
      loadingModal: true
    })

    return verifyAtk({
      accesstoken: atk
    }).then(res => {
      console.log(res)
      if (res.success) {
        commit('UPDATE_USER', {
          user: res
        })
        // alert('登录认证成功')
      } else {
        alert('登录认证失败，请输入有效的accessToken')
      }
      commit('TOGGLE_LOADINGMODAL', {
        loadingModal: false
      })
      return res
    })
  }
}
