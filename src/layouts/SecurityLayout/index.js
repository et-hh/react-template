import React from 'react'
import { Redirect } from 'umi'
import { connect } from 'dva'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
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
    if (this.props.currentUser && this.props.currentUser.userId) {
      return
    }
    this.props.dispatch({
      type: 'user/fetchCurrent'
    })
  }

  render() {
    if (!this.state.isReady) return null
    
    const { loading, currentUser, location } = this.props
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
          {/* TODO: 加了没效果... */}
          <TransitionGroup className={styles.app_main}>
            <CSSTransition key={location.pathname} classNames='fade' timeout={300}>
              {this.props.children}
            </CSSTransition>
          </TransitionGroup>
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
