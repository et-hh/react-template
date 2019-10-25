// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  routes: [
    {
      path: '/corpus',
      component: '../layouts/SecurityLayout', // 相对于pages目录下
      routes: [
        {
          path: '/corpus',
          component: './corpus',
          meta: {
            title: '语料库'
          }
        }
      ]
    },
    {
      path: '/demo',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/demo',
          component: './demo',
          meta: {
            title: 'demo'
          }
        }
      ]
    },
    {
      path: '/',
      component: '../layouts/EmptyLayout',
      routes: [
        {
          path: '/',
          redirect: '/corpus'
        },
        {
          path: '/login',
          component: './login'
        },
        {
          component: './404'
        }
      ],
      hidden: true
    }
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: {
        immer: true
      },
      dynamicImport: { webpackChunkName: true },
      title: 'react-demo项目',
      dll: true,
      locale: {
        enable: true,
        default: 'en-US',
      },
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
  proxy: {
    '/apiPlatform': {
      target: 'http://nlp.yiwise.com',
      changeOrigin: true
    }
  }
}
