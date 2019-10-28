import React from 'react'
import { connect } from 'dva'
import { LoginForm } from '@/components'
import styles from './index.scss'

@connect()
class Login extends React.Component {
  handleSubmit = payload => {
    this.props.dispatch({
      type: 'user/login',
      payload
    })
  }

  render() {
    return (
      <div className={styles.login}>
        <LoginForm
          title='一知语料库管理系统'
          style={{
            width: '360px',
            margin: 'auto'
          }}
          onSubmit={payload => this.handleSubmit(payload)}
        />
      </div>
    )
  }
}

export default Login