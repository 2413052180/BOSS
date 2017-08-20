import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login/login'
// import defaultlogin from '@/components/login/defaultlogin'
const test = resolve => require(['@/components/test'], resolve)

//1 、组件异步加载，只有在组件被访问的时候才会加载，提高了性能
const home = resolve => require(['@/components/common/home'], resolve)
const joblist = resolve => require(['@/components/job/joblist'], resolve)
const jobdetail = resolve => require(['@/components/job/jobdetail'], resolve)
const company = resolve => require(['@/components/company/company'], resolve)
const comDetail = resolve => require(['@/components/company/comDetail'], resolve)
const message = resolve => require(['@/components/message/message'], resolve)
const mesChat = resolve => require(['@/components/message/mesChat'], resolve)
const mesInteract = resolve => require(['@/components/message/mesInteract'], resolve)
const aboutme = resolve => require(['@/components/aboutme/myinfo'], resolve)




Vue.use(Router)

// 路由返回定位滚动条位置，尝试不行！
const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    // savedPosition is only available for popstate navigations.
    return savedPosition
  } else {
    const position = {}
    // new navigation.
    // scroll to anchor by returning the selector
    if (to.hash) {
      position.selector = to.hash
    }
    // check if any matched route config has meta that requires scrolling to top
    if (to.matched.some(m => m.meta.scrollToTop)) {
      // cords will be used if no selector is provided,
      // or if the selector didn't match any element.
      position.x = 0
      position.y = 0
    }
    // if the returned position is falsy or an empty object,
    // will retain current scroll position.
    // console.log(position)
    return position
  }
}

export default new Router({
  routes: [
      {
          path:'/',
          name:"login",
          component:login
      },
      {
          path:'/home',
          component:home,
          children:[
            {
              path:'/',
              name:"joblist",
              component:joblist
            },
            {
              path:"/company",
              name:"company",
              component:company
            },
            {
              path:"/message",
              component:message,
              children:[
                {
                  path:'',
                  name:"mesChat",
                  component:mesChat
                },
                {
                  path:'/mesInteract',
                  ame:"mesInteract",
                  component:mesInteract
                }
              ]
            },
            {
              path:"/aboutme",
              name:"me",
              component:aboutme
            },
          ]
      },
      {
        path:"/detail/:jobId",
        name:"detail",
        component:jobdetail
      },
      {
      	path:"/comdetail/:id",
      	name:"comDetail",
      	component:comDetail
      },
      {
        path:"/test",
        name:"test",
        component:test
      }
  ]
})
