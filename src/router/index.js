import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index'
import Topic from '@/pages/topic'
import Mixins from '@/pages/mixins'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/topic/:id',
      name: 'topic',
      component: Topic,
      props: true
    },
    {
      path: '/Mixins',
      name: 'mixins',
      component: Mixins
    }
  ]
})
