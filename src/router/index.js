import Vue from 'vue'
import Router from 'vue-router'
import RestrictionInquire from '@/components/RestrictionInquire'
import CarSet from '@/components/CarSet'
import VipPage from '@/components/VipPage'
import RemindPage from '@/components/RemindPage'
import ChangePhone from '@/components/ChangePhone'
import keyboard from '@/components/keyboard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/RestrictionInquire',
      component: RestrictionInquire
    },
    {
      path: '/CarSet',
      component: CarSet
    },
    {
      path: '/VipPage',
      component: VipPage
    },
    {
      path: '/RemindPage',
      component: RemindPage
    },
    {
      path: '/ChangePhone',
      component: ChangePhone
    },
    {
      path: '/keyboard',
      component: keyboard
    }
  ]
})
