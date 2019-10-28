/**
 * @param { String } str 待加密字符串
 * encodeCharAt = String.fromCharCode(字符的unicode值 + 前面字符串的unicode)
 */
export function encodeStr(str) {
  // 第一位salt值: 字符串第一位 + 字符串长度
  let tmp = String.fromCharCode(str.charCodeAt(0) + str.length)
  for(let i = 1; i < str.length; i++) {
    tmp += String.fromCharCode(str.charCodeAt(i) + str.charCodeAt(i - 1))
  }
  return encodeURIComponent(tmp)
}

/**
 *
 * @param { String } str 加密字符串
 * decodeCharAt = String.fromCharCode(字符的unicode值 - 前面字符串的unicode)
 */
export function decodeStr(str) {
  str = decodeURIComponent(str)
  var c = String.fromCharCode(str.charCodeAt(0) - str.length)
  for (var i = 1; i < str.length; i++) {
    c += String.fromCharCode(str.charCodeAt(i) - c.charCodeAt(i - 1))
  }
  return c
}