import request from '@/utils/request'

const entryPrefix = '/apiPlatform/entry'
const prefix = '/apiPlatform/user'

export async function login(params) {
  return request(`${entryPrefix}/login`, {
    method: 'POST',
    data: params,
    requestType: 'form',
  })
}

export async function logout() {
  return request(`${entryPrefix}/logout`, {
    method: 'POST',
  })
}

export async function fetchUser() {
  return request(`${prefix}/getUserInfo`)
}
