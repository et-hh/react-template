function get(key) {
  let cookieValue = ''
  const cookie = document.cookie
  if (!cookie) return cookieValue

  const cookies = cookie.split('; ')
  if (!cookies || !cookies.length) return cookieValue

  for(let i = 0; i < cookies.length; i++) {
    const partCookie = cookies[i]
    const partCookies = partCookie.split('=')
    const partCookieKey = partCookies[0]
    if (key === partCookieKey) {
      cookieValue = partCookies[1]
      break
    }
  }
  return cookieValue
}

export default {
  get
}