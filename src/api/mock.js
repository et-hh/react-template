import request from '@/utils/request'

export async function fetchIntents() {
  return request('/apiPlatform/intent/list', {
    params: {
      robotId: 201,
      pageNum: 1,
      pageSize: 20
    }
  })
}