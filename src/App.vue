<template>
  <div id="app" class="app">
    <!-- 用户栏 -->
    <div class="user-bar">
      <a class="user-bar-home" @click="toHome">首页</a>

      <!-- 未登录 -->
      <div class="unsign-in-box" v-show="!loginUser">
        <div class="unsign-in">
          <a class="sign-in-btn" @click="handleSignInClick">登录</a>
        </div>
        <Modal
          v-model="signInModal"
          title="登录"
        >
          <div class="sign-in-modal">
            <div class="sign-in-atk">
              <div class="cinput">
                <input type="text" placeholder="输入accessToken登录" v-model="atk">
              </div>
              <p class="sign-in-tips">问题：如何获取 accessToken？ 用户登录cnode后，在设置页面可以看到自己的 accessToken。快速登录：cb382618-a01a-47cd-a5ef-e3c9ccd425d1</p>
            </div>

            <div class="sign-in-bar">
              <div class="cbtn" @click="handloSubmitSignIn">
                <span class="cbtn-txt">登录</span>
              </div>
            </div>
          </div>
        </Modal>
      </div>

      <!-- 已登录 -->
      <div class="signed-in-box" v-if="loginUser">
        <div class="signed-in-user">
          <span class="user-name-toggle" @mouseover="showUserDetail" @mouseout="hideUserDetail">{{ loginUser.loginname }}</span>
          <span class="sign-out" @click="loginOut">登出</span>
        </div>

        <transition name="user-detail">
          <div class="user-detail" v-show="detailVisible" @mouseover="showUserDetail" @mouseout="hideUserDetail" >
            <div class="user-detail-ava"><img :src="loginUser.avatar_url" alt="cytsui"></div>
            <div class="user-detail-score">积分：{{ loginUser.score }}</div>
            <div class="uesr-detail-github">login name：{{ loginUser.loginname }}</div>
          </div>
        </transition>

      </div>
    </div>
    <router-view></router-view>
    <LoadingModal :show="loadingModal"></LoadingModal>
  </div>
</template>

<style lang="less">
@import 'style/normalize.css';

body {
  background: #f0f2f5;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', SimSun, sans-serif;
}

ul {
  margin: 0;
  padding: 0;
}

li {
  list-style: none;
}

.app {
  width: 960px;
  margin: 0 auto;
  padding: 0 0 30px 0;
  background: #ffffff;
  .user-bar {
    position: relative;
    height: 42px;
    line-height: 42px;
    margin-bottom: 42px;
    background: #108ee9;
    padding: 0 20px;
    .user-bar-home {
      cursor: pointer;
      display: block;
      color: #ffffff;
      font-size: 14px;
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      padding: 0 16px;
      z-index: 1;
    }
    .unsign-in {
      text-align: right;
    }

    .sign-in-btn {
      cursor: pointer;
      display: inline-block;
      color: #fff;
      height: 100%;
    }

    .sign-in-atk {
      margin: 10px 0;
      .sign-in-tips {
        font-size: 13px;
        line-height: 22px;
        color: #bdbdbd;
      }
    }
  }

  // cbtn 组件，后续抽象为组件
  .cbtn {
    display: inline-block;
    padding: 0 15px;
    height: 32px;
    line-height: 32px;
    border-radius: 5px;
    text-align: center;
    background: #108ee9;
    transition: background-color 400ms;
    cursor: pointer;
    .cbtn-txt {
      color: #ffffff;
    }

    &:hover {
      background: #7ec2f3;
    }

    &:active {
      background: #49a9ee;
      transition: background-color 0ms;
    }
  }

  // cinput 组件，后续抽象为组件
  .cinput {
    input {
      width: 320px;
      outline: none;
      text-align: center;
    }
  }

  .signed-in-box {
    height: 100%;
    position: relative;

    .signed-in-user {
      height: 100%;
      text-align: right;
    }
    .sign-out,
    .user-name-toggle {
      cursor: pointer;
      margin-left: 12px;
      display: inline-block;
      color: #fff;
    }
    .sign-out {
      cursor: pointer;
      transition: 600ms;
      &:hover {
        color: #d2eafb;
      }
    }
    .user-detail {
      width: 300px;
      height: 200px;
      background: #108ee9;
      position: absolute;
      bottom: -200px;
      right: -20px;
      .user-detail-ava {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        overflow: hidden;
        margin: 10px auto;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .user-detail-score,
      .uesr-detail-github {
        height: 22px;
        line-height: 22px;
        text-align: center;
        padding-top: 10px;
        color: #ffffff;
      }
    }
  }

  .user-detail-enter-active,
  .user-detail-leave-active {
    transition: 300ms;
  }

  .user-detail-enter,
  .user-detail-leave-to {
    opacity: 0;
  }
}
</style>

<script>
import Cookie from 'js-cookie'
import { mapState, mapActions } from 'vuex'
import { LoadingModal, Modal } from '@/components/'
import { getUserInfo } from '@/actions/'

export default {
  name: 'app',
  components: {
    LoadingModal,
    Modal
  },

  data() {
    return {
      detailVisible: false,
      signInModal: false,
      atk: '',
      lgn: Cookie.get('lgn'),
      loginUser: null
    }
  },

  created() {
    const { lgn, setUserInfo } = this
    if (lgn) {
      setUserInfo(lgn)
    }
  },

  computed: mapState({
    loadingModal: state => state.loadingModal,
    user: state => state.user
  }),

  methods: {
    ...mapActions(['submitSignIn']),

    toHome() {
      this.$router.push(`/`)
    },

    handleSignInClick() {
      this.signInModal = true
    },

    async handloSubmitSignIn() {
      const { atk, setUserInfo } = this
      if (atk === '') {
        alert(' accessToken 不能为空')
      } else {
        await this.submitSignIn(atk).then(res => {
          // 设置cookie
          if (res.success) {
            Cookie.set('atk', atk, { expires: 1 })
            Cookie.set('lgn', res.loginname, { expires: 1 })
            this.lgn = res.loginname
          }
        })
        setUserInfo(this.lgn)
      }
    },

    setUserInfo(lgn) {
      getUserInfo(lgn).then(res => {
        if (res.success) {
          this.loginUser = res.data
        }
      })
    },

    showUserDetail() {
      this.detailVisible = true
    },

    hideUserDetail() {
      this.detailVisible = false
    },

    loginOut() {
      var cookies = document.cookie.split(';')

      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i]
        console.log(cookie)
        var eqPos = cookie.indexOf('=')
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT'
      }
      location.reload()
    }
  }
}
</script>
