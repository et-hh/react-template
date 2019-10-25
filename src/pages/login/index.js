import React from 'react'
import { Form, Input, Icon, Button } from 'antd'
import { connect } from 'dva'

@connect()
class Login extends React.Component {
  state = {
    phoneNumber: null,
    password: null
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.dispatch({
      type: 'user/login',
      payload: {
        phoneNumber: this.state.phoneNumber,
        password: this.state.password
      }
    })
  }

  render() {
    return (
      <div className='login'>
        <div className='login_title'>语料库系统</div>
        <Form
          onSubmit={this.handleSubmit}
        >
          <Form.Item
          >
            <Input
              prefix={<Icon type='user'/>}
              placeholder='username'
              value={this.state.phoneNumber}
              onChange={e => this.setState({
                phoneNumber: e.target.value
              })}
            />
          </Form.Item>
          <Form.Item

          >
            <Input
              prefix={<Icon type='lock'/>}
              placeholder='password'
              type='password'
              value={this.state.password}
              onChange={e => this.setState({
                password: e.target.value
              })}
            />
          </Form.Item>
          <Form.Item>
            <Button htmlType='submit'>登录</Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default Login