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
          title='语料库系统'
          style={{
            width: '500px',
            margin: 'auto'
          }}
          onSubmit={payload => this.handleSubmit(payload)}
        />
      </div>
    )
  }
}

export default Login