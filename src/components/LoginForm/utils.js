import { encodeStr, decodeStr } from '@/utils'

const STORE_PP_KEY = 'YIWISE_CORPUS_PPO'

export function genPPCache() {
  let cache = {}
  try {
    cache = JSON.parse(localStorage.getItem(STORE_PP_KEY)) || {}
  } catch (err) {
    cache = {}
  }
  return cache
}
// PP: phoneNumber Password
export function storePPObj({
  phoneNumber,
  password
}) {
  const cache = genPPCache()
  cache[phoneNumber] = password ? encodeStr(password) : ''
  localStorage.setItem(STORE_PP_KEY, JSON.stringify(cache))
}

export function genDecodePassword(phoneNumber) {
  return decodeStr(phoneNumber)
}
