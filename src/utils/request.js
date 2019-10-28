/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request'
import { notification } from 'antd'
/**
 * 异常处理程序
 */

const errorHandler = res => {
  const errMsg = res.resultMsg
  if (errMsg) {
    notification.error({
      description: errMsg,
      message: '调用服务器错误',
    })
  } else {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    })
  }
}

/**
 * 配置request请求时的默认参数
 */

const request = extend({
  errorHandler,
  // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
})

request.interceptors.response.use(async response => {
  // 获取后端返回的原始数据
  const data = await response.clone().json()
  if (data.code !== 200) {
    errorHandler(data)
  }
  return response
})

export default request
