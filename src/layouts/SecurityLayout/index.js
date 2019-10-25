import React from 'react'
import { Redirect } from 'umi'
import { connect } from 'dva'
import styles from '../index.scss'
import LeftSidebar from '../components/LeftSidebar'
import TopNav from '../components/TopNav'

class SecurityLayout extends React.Component {
  state = {
    isReady: false
  }

  componentDidMount() {
    this.setState({
      isReady: true
    })
    this.props.dispatch({
      type: 'user/fetchCurrent'
    })
  }

  render() {
    if (!this.state.isReady) return null
    
    const { loading, currentUser } = this.props
    if (loading)  {
      return <div>loading</div>
    }
    
    const isLogin = !!(currentUser && currentUser.userId)
    if (!isLogin) {
      return <Redirect to={'/login'}/>
    }

    return (
      <div className={styles.app_container}>
        <div className={styles.app_nav}>
          <TopNav />
        </div>
        <div className={styles.app_content}>
          <div className={styles.app_sidebar}>
            <LeftSidebar />
          </div>
          <div className={styles.app_main}>
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

export default connect(({ user, loading }) => {
  return {
    currentUser: user.current,
    loading: loading.models.user
  }
})(SecurityLayout)
