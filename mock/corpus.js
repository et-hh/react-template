import mockjs from 'mockjs'

// 更多模版用法参考：http://mockjs.com/examples.html
// 用法的解释： https://github.com/nuysoft/Mock/wiki
export default {
  'GET /apiMock/getCorpusList': mockjs.mock({
    'list|100': [{
      name: '@city',
      'value|1-100': 4411111
    }]
  })
}