import Vue from 'vue'
import Router from 'vue-router'
import BigPin from '@/components/BigPin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'BigPin',
      component: BigPin
    }
  ]
})
