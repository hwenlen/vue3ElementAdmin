const routesAdmin = [
  {
    id: 1,
    pid: 0,
    name: "Finance",
    path: "/finance",
    redirect: "/finance/fundincome",
    meta: {
      title: '平台财务',
      icon: "location"
    },
    component: "Layout",
  }, {
    id: 2,
    pid: 1,
    name: "Fundincome",
    path: "fundincome",
    meta: {
      title: '资金收入表',
      icon: "location"
    },
    component: "finance/fundincome",
  }, {
    id: 3,
    pid: 1,
    name: "Fundexpend",
    path: "fundexpend",
    meta: {
      title: '资金支出表',
      icon: "location"
    },
    component: "finance/fundexpend",
  }, {
    id: 4,
    pid: 0,
    name: "Personnel",
    path: "/personnel",
    redirect: "/personnel/member",
    meta: {
      title: '人员管理',
      icon: "location"
    },
    component: "Layout",
  }, {
    id: 5,
    pid: 4,
    name: "Member",
    path: "member",
    meta: {
      title: '会员列表',
      icon: "location"
    },
    component: "personnel/member",
  }, {
    id: 6,
    pid: 0,
    name: "Order",
    path: "/order",
    redirect: "/order/commodity",
    meta: {
      title: '订单管理',
      icon: "location"
    },
    component: "Layout",
  }, {
    id: 7,
    pid: 6,
    name: "Commodity",
    path: "commodity",
    meta: {
      title: '商品订单',
      icon: "location"
    },
    component: "order/commodity",
  }, {
    id: 8,
    pid: 6,
    name: "Serve",
    path: "serve",
    meta: {
      title: '服务订单',
      icon: "location"
    },
    component: "order/serve",
  }
]

const routesVisitor = [
  {
    id: 1,
    pid: 0,
    name: "Finance",
    path: "/finance",
    redirect: "/finance/fundincome",
    meta: {
      title: '平台财务',
      icon: "location"
    },
    component: "Layout",
  }, {
    id: 2,
    pid: 1,
    name: "Fundincome",
    path: "fundincome",
    meta: {
      title: '资金收入表',
      icon: "location"
    },
    component: "finance/fundincome",
  }, {
    id: 3,
    pid: 1,
    name: "Fundexpend",
    path: "fundexpend",
    meta: {
      title: '资金支出表',
      icon: "location"
    },
    component: "finance/fundexpend",
  }, {
    id: 6,
    pid: 0,
    name: "Order",
    path: "/order",
    redirect: "/order/commodity",
    meta: {
      title: '订单管理',
      icon: "location"
    },
    component: "Layout",
  }, {
    id: 7,
    pid: 6,
    name: "Commodity",
    path: "commodity",
    meta: {
      title: '商品订单',
      icon: "location"
    },
    component: "order/commodity",
  }, {
    id: 8,
    pid: 6,
    name: "Serve",
    path: "serve",
    meta: {
      title: '服务订单',
      icon: "location"
    },
    component: "order/serve",
  }
]

export {
  routesAdmin,
  routesVisitor
}