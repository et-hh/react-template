import React from 'react'
import { connect } from 'dva'
import styles from './index.scss'

@connect()
class TopNav extends React.Component {
  handleLogout() {
    this.props.dispatch({
      type: 'user/logout'
    })
  }
  render() {
    return (
      <div className={styles.navbar}>
        <div className={styles.left}>语料库管理系统</div>
        <div className={styles.right}>
          <img className={styles.avatar} src="" alt=""/>
          <span className={styles.username} onClick={() => this.handleLogout()}>退出登录</span>
        </div>
      </div>
    )
  }
}

export default TopNav