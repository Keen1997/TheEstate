import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home' 
import Course1 from '@/components/Course1' 
import Course2 from '@/components/Course2' 
import Advertise from '@/components/Advertise'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/course/01',
      name: 'Course1',
      component: Course1
    },
    {
      path: '/course/02',
      name: 'Course2',
      component: Course2
    },
    {
      path: '/advertise',
      name: 'Advertise',
      component: Advertise
    },
  ]
})
