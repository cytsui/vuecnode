<template>
  <div class="topic-component">
    <!-- topic content -->
    <div class="topic-cont" v-if="topicData">
      <div class="hd">
        <div class="hd-title">{{ topicData.title }}</div>
        <div class="hd-subtitle">
          <span class="hd-subtitle-date"> 发布于：{{ getTopicDate }}</span>
          <span class="hd-subtitle-visit">浏览数：{{ topicData.visit_count }}</span>
        </div>
      </div>
      <div class="bd topic_content" v-html="topicData.content"></div>
    </div>
    <div class="topic-loading" v-else>
      <p>loading...</p>
    </div>
    <div class="topic-replies"></div>
  </div>
</template>

<script>
import { getTopicDetail } from '@/actions/'

export default {
  name: 'topic',
  props: ['id'],
  data() {
    return {
      topicData: this.$store.state.topicData
    }
  },
  created() {
    if (!this.topicData) {
      getTopicDetail(this.id).then(res => {
        if (res.success) {
          this.topicData = res.data
        }
      })
    }
  },

  computed: {
    getTopicDate() {
      /* function turnTwoNum(num) {
        if (num > 10) return num
        else return `0${num}`
      } */

      function getDateDiff(dateTimeStamp) {
        var minute = 1000 * 60
        var hour = minute * 60
        var day = hour * 24
        var month = day * 30
        var now = new Date().getTime()
        var diffValue = now - dateTimeStamp
        if (diffValue < 0) {
          return
        }
        var monthC = diffValue / month
        var weekC = diffValue / (7 * day)
        var dayC = diffValue / day
        var hourC = diffValue / hour
        var minC = diffValue / minute
        var result = '未知时间'
        if (monthC >= 1) {
          result = '' + parseInt(monthC) + '月前'
        } else if (weekC >= 1) {
          result = '' + parseInt(weekC) + '周前'
        } else if (dayC >= 1) {
          result = '' + parseInt(dayC) + '天前'
        } else if (hourC >= 1) {
          result = '' + parseInt(hourC) + '小时前'
        } else if (minC >= 1) {
          result = '' + parseInt(minC) + '分钟前'
        } else result = '刚刚'
        return result
      }

      const date = new Date(this.topicData.create_at)
      const stamp = date.getTime()
      /* const Y = date.getFullYear()
      const M = date.getMonth()
      const D = date.getDate()
      const h = date.getHours()
      const m = date.getMinutes() */
      const time = getDateDiff(stamp)
      return time
    }
  }
}
</script>

<style lang="less" scoped>
.topic-component {
  .hd {
    padding: 20px 0;
    background: #108ee9;
    .hd-title {
      color: #ffffff;
      text-align: center;
      font-size: 15px;
      margin-bottom: 20px;
    }
    .hd-subtitle {
      text-align: center;
      color: #d2eafb;
      font-size: 13px;
      .hd-subtitle-date {
        margin-right: 10px;
      }
      .hd-subtitle-visit {
      }
    }
  }

  .bd {
    padding: 20px;
  }
  .topic-loading {
    text-align: center;
  }
}
</style>

<style lang="less"></style>

