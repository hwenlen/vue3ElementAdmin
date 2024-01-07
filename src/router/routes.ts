import { RouteRecordRaw } from 'vue-router'
import { HOME_ROUTE_NAME, LOGIN_ROUTE_NAME } from '@/settings'
import Layout from "@/layout/index.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: LOGIN_ROUTE_NAME,
    meta: {
      icon: "location",
      hideInMenu: true,
      title: '登录',
    },
    component: () => import('../views/login/login.vue')
  }, {
    path: '/:catchAll(.*)',
    name: 'error',
    meta: {
      icon: "location",
      hideInMenu: true,
      title: '404',
    },
    component: () => import('@/views/error/index.vue')
  }, {
    path: "/",
    redirect: "/home",
    component: Layout,
    children: [
      {
        path: "/home",
        name: HOME_ROUTE_NAME,
        meta: {
          hideInMenu: true,
          icon: "HomeFilled",
          title: "首页",
          affix: true
        },
        component: () => import("@/views/home/index.vue"),
      }
    ],
  }, {
    path: "/finance",
    meta: {
      title: '平台财务',
      icon: "location"
    },
    component: Layout,
    redirect: '/finance/fundincome',
    children: [{
      path: "fundincome",
      name: "fundincome",
      meta: {
        icon: "location",
        title: "资金收入表"
      },
      component: () => import("@/views/finance/fundincome.vue"),
    }, {
      path: "fundexpend",
      name: "fundexpend",
      meta: {
        icon: "location",
        title: "资金支出表",
      },
      component: () => import("@/views/finance/fundexpend.vue"),
    }],
  }, {
    path: "/personnel",
    meta: {
      title: '人员管理',
      icon: "location"
    },
    component: Layout,
    redirect: '/personnel/member',
    children: [{
      path: "member",
      name: "member",
      meta: {
        icon: "location",
        title: "会员列表",
      },
      component: () => import("@/views/member/index.vue"),
    }]
  }, {
    path: "/order",
    meta: {
      title: '订单管理',
      icon: "location"
    },
    component: Layout,
    redirect: '/order/commodity',
    children: [{
      path: "commodity",
      name: "commodity",
      meta: {
        icon: "location",
        title: "商品订单",
      },
      component: () => import("@/views/order/commodity.vue"),
    }, {
      path: "serve",
      name: "serve",
      meta: {
        icon: "location",
        title: "服务订单",
      },
      component: () => import("@/views/order/serve.vue"),
    }]
  }
]

export default routes