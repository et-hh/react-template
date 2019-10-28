import { login, logout, fetchUser } from '@/api/user'
import { router } from 'dva'
import { notification } from 'antd'

export default {
  namespace: 'user',

  state: {
    current: {}, // 当前用户信息
  },

  effects: {
    *login({ payload }, { call, put }) {
      const res = yield call(login, payload)
      yield put({ type: 'updateCurrent', payload: res.data })
      yield put(router.routerRedux.replace('/'))
    },
    *logout(_, { call, put }) {
      yield call(logout)
      yield put({ type: 'updateCurrent', payload: {} })
      notification.error({
        message: '登出成功',
      })
      yield put(router.routerRedux.replace('/login'))
    },
    *fetchCurrent(_, { call, put }) {
      const res = yield call(fetchUser)
      yield put({ type: 'updateCurrent', payload: res.data })
    },
    *updateCurrent({ payload = {} }, { call, put }) {
      const currentUser = {
        name: payload.name,
        phoneNumber: payload.phoneNumber,
        userId: payload.userId,
      }
      yield put({
        type: 'saveCurrentUser',
        payload: currentUser,
      })
    },
  },

  reducers: {
    saveCurrentUser(state, action) {
      state.current = action.payload
      return state
    },
  },
}
