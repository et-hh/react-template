import React from 'react'
import { Redirect } from 'umi'
import { connect } from 'dva'
import zhCN from 'antd/es/locale/zh_CN'
import { ConfigProvider } from 'antd'
import { PageLoading } from '@/components'
import styles from '../index.scss'
import LeftSidebar from '../components/LeftSidebar'
import TopNav from '../components/TopNav'

class SecurityLayout extends React.Component {
  state = {
    isReady: false,
  }

  componentDidMount() {
    this.setState({
      isReady: true,
    })

    const { currentUser, dispatch } = this.props
    if (currentUser && currentUser.userId) {
      return
    }

    dispatch({
      type: 'user/fetchCurrent',
    })
  }

  render() {
    if (!this.state.isReady) return null

    const { loading, currentUser, children } = this.props
    if (loading) {
      return <PageLoading />
    }

    const isLogin = !!(currentUser && currentUser.userId)
    if (!isLogin) {
      return <Redirect to={'/login'} />
    }

    return (
      <ConfigProvider locale={zhCN}>
        <div className={styles.app_container}>
          <div className={styles.app_nav}>
            <TopNav />
          </div>
          <div className={styles.app_content}>
            <div className={styles.app_sidebar}>
              <LeftSidebar />
            </div>
            <div className={styles.app_main}>{children}</div>
          </div>
        </div>
      </ConfigProvider>
    )
  }
}

export default connect(({ user, loading }) => {
  return {
    currentUser: user.current,
    loading: loading.models.user,
  }
})(SecurityLayout)
