<template>
  <div class="tab-component">
    <div class="tabs">
      <ul>
        <template v-for="(item, index) in tabs">
          <li class="tabs-item" :class="item.active ? {'active' : true} : null" :key="item.id" @click="handleTabsClick(item, index)">{{ item.title }}</li>
        </template>
      </ul>
    </div>

    <div class="lists">
      <ul>
        <template v-for="item in lists">
          <li class="lists-item" :key="item.id">
            <a :href="getUserUrl(item.author.loginname)" title="nick" class="item-author"><img :src="item.author.avatar_url" :alt="item.author.loginname"></a>
            <span class="item-type">{{getTypeTxt(item.tab)}}</span>
            <a class="item-title" @click="doGetTopicDetail(item.id)">{{item.title}}</a>
          </li>
        </template>
      </ul>
      <div class="load-more"><a class="load-more-btn" @click="loadMore">{{ loadMoreTxt }}</a></div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import '../style/common.less';

.trans() {
  transition: 300ms;
}

.txtColor() {
  color: rgba(0, 0, 0, 0.65);
}

.tabs {
  padding: 0 50px;

  ul {
    border-radius: 5px;
    display: flex;
    overflow: hidden;
  }
  .tabs-item {
    cursor: pointer;
    flex: 1;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: #d2eafb;
    color: rgba(0, 0, 0, 0.65);
    font-size: 15px;
    .trans();
    &.active {
      background: #108ee9;
      color: #ffffff;
      &:hover {
        cursor: not-allowed;
        background: #108ee9;
        color: #ffffff;
      }
    }
    &:hover {
      background: #7ec2f3;
      color: #ffffff;
    }
  }
}

.lists {
  margin: 20px;
  padding: 20px;
  border: 1px solid #d2eafb;
  border-radius: 5px;

  .lists-item {
    padding: 10px 0;
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #d2eafb;
    overflow: hidden;
    transform-origin: 0 50%;
    .txtColor();
    .trans();
    &:hover {
      background: #7ec2f3;
      transform: scale(1.05);
      .item-title {
        color: #ffffff;
      }
    }

    .item-author {
      float: left;
      display: block;
      width: 30px;
      height: 30px;
      margin-left: 10px;
      img {
        width: 30px;
        height: 30px;
      }
    }

    .item-type {
      display: block;
      float: left;
      width: 30px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      font-size: 13px;
      margin-left: 10px;
    }
    .item-title {
      display: block;
      cursor: pointer;
      float: left;
      height: 30px;
      line-height: 30px;
      margin-left: 10px;
      max-width: 500px;
      .txto();
      .trans();
    }
    .item-title {
      .txtColor();
    }
  }
}

.load-more {
  text-align: center;
  .load-more-btn {
    cursor: pointer;
    display: block;
    width: 200px;
    height: 30px;
    line-height: 30px;
    border: 1px solid #108ee9;
    border-radius: 5px;
    font-size: 13px;
    transition: 300ms;
    margin: 30px auto 0;
    &:hover {
      text-decoration: none;
      background: #108ee9;
      color: #ffffff;
      border: color #ffffff;
    }
  }
}
</style>

<script>
import { getTopic, getTopicDetail } from '@/actions/'
import { mapActions, mapMutations } from 'vuex'

let isLoadingMore = false

export default {
  name: 'tab',
  data() {
    return {
      curPage: 1,
      curType: 'all',
      tabs: [
        {
          id: 'all',
          title: '全部',
          active: true
        },
        {
          id: 'good',
          title: '精华',
          active: false
        },
        {
          id: 'share',
          title: '分享',
          active: false
        },
        {
          id: 'job',
          title: '招聘',
          active: false
        }
      ],
      tabsIndex: 0,
      lists: [],
      loadMoreTxt: '加载更多'
    }
  },

  created() {
    getTopic({
      page: 1,
      limit: 25
    }).then(res => {
      if (res.success) {
        this.lists = res.data
      }
    })
  },

  methods: {
    ...mapActions(['doGetTopicDetail']),
    ...mapMutations({
      toggleLoadingModal: 'TOGGLE_LOADINGMODAL'
    }),

    handleTabsClick(tabsItem, tabsItemIndex) {
      if (tabsItemIndex === this.tabsIndex) return false
      const { tabs } = this
      const type = tabs[tabsItemIndex].id
      getTopic({
        tab: type,
        page: 1,
        limit: 25
      }).then(res => {
        if (res.success) {
          // set active tab item
          tabs.forEach((item, index) => {
            if (index === tabsItemIndex) {
              item.active = true
              this.tabsIndex = tabsItemIndex
            } else {
              item.active = false
            }
          })
          this.lists = res.data
          this.curType = type
          this.curPage = 1
        } else {
          alert('网络异常 请重新尝试')
        }
      })
    },

    getUserUrl(username) {
      return `https://cnodejs.org/user/${username}`
    },

    getTypeTxt(type) {
      // console.log(type);
      let txt = ''
      switch (type) {
        case 'share':
          txt = '分享'
          break
        case 'ask':
          txt = '问答'
          break
        case 'job':
          txt = '招聘'
          break
        default:
          break
      }
      return txt
    },

    loadMore() {
      if (isLoadingMore) return false
      isLoadingMore = true
      this.loadMoreTxt = 'loading...'

      const nextPage = this.curPage + 1
      const type = this.curType

      getTopic({
        tab: type,
        page: nextPage,
        limit: 25
      }).then(res => {
        isLoadingMore = false
        this.loadMoreTxt = '加载更多'
        if (res.success) {
          this.curPage += 1
          this.lists = this.lists.concat(res.data)
        } else {
          alert('网络出错 请重新尝试')
        }
      })
    }
  }
}
</script>

