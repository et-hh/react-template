export default [
  {
    path: '/corpus',
    component: '../layouts/SecurityLayout', // 相对于pages目录下
    routes: [
      {
        path: '/corpus',
        component: './corpus',
        meta: {
          title: '语料库',
        },
      },
    ],
  },
  {
    path: '/test',
    component: '../layouts/SecurityLayout', // 相对于pages目录下
    routes: [
      {
        path: '/test',
        component: './test',
        meta: {
          title: '测试',
        },
      },
    ],
  },
  {
    path: '/demo',
    component: '../layouts/SecurityLayout',
    meta: {
      title: 'demo子菜单',
    },
    routes: [
      {
        path: '/demo',
        component: './demo',
        meta: {
          title: 'demo222',
        },
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/EmptyLayout',
    routes: [
      {
        path: '/',
        redirect: '/corpus',
      },
      {
        path: '/login',
        component: './login',
      },
      {
        component: './404',
      },
    ],
    hidden: true,
  },
]