import React from 'react'
import { connect } from 'dva'
import styles from './index.scss'
import UpAndDownPoper from '@/layouts/components/UpAndDownPoper'

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

          {/* 导入导出下拉列表 */}
          <UpAndDownPoper className={styles.block} />

          {/* 头像、用户名 */}
          <span className={styles.block}>
            <img className={styles.avatar} src="" alt=""/>
            <span className={styles.username} onClick={() => this.handleLogout()}>退出登录</span>
          </span>
        </div>
      </div>
    )
  }
}

export default TopNav