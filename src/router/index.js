import Vue from 'vue'
import Router from 'vue-router'

const CarSet = () => import('@/components/CarSet')
const keyboard = () => import('@/components/keyboard')
const RestrictionInquire = () => import('@/components/RestrictionInquire')
const VipPage = () => import('@/components/VipPage')
const RemindPage = () => import('@/components/RemindPage')
const ChangePhone = () => import('@/components/ChangePhone')

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
