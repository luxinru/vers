import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/login'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index.vue'),
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/home/index.vue'),
    },
    {
      path: '/fee-confirm',
      name: 'fee-confirm',
      title: '代支付费用确认',
      component: () => import('@/views/fee-confirm/index.vue')
    },
    {
      path: '/message',
      name: 'message',
      title: '贷款责任与告知',
      component: () => import('@/views/message/index.vue')
    },
    {
      path: '/contract',
      name: 'contract',
      title: '合同权益与费用确认',
      component: () => import('@/views/contract/index.vue')
    },
    {
      path: '/videoCertification',
      name: 'videoCertification',
      title: '视频认证',
      component: () => import('@/views/certification/video.vue')
    },
    {
      path: '/videos',
      name: 'videos',
      title: '视频查看',
      component: () => import('@/views/videos/index.vue')
    },
    {
      path: '/video-recording',
      name: 'videoRecording',
      title: '视频录像',
      component: () => import('@/views/video-recording/index.vue')
    },
    // 如果URL输入错误或者是URL 匹配不到任何静态资源，就自动跳到到Home页面,也可以指向一个专门的 404 页面
    { path: '/', redirect: '/home' }
  ]
})
