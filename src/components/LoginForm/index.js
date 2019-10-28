import React from 'react'
import { Form, Icon, Button, Checkbox } from 'antd'
import { YiwiseInput } from '@/components'
import {
  mobile as regexpMobile,
  password as regexpPassword
} from '@/utils/regexp'
import styles from './index.scss'

class LoginForm extends React.Component {
  handleSubmit(e) {
    e.preventDefault()
    this.props.form.validateFields((error, fieldsValue) => {
      if (error) return
      this.props.onSubmit && this.props.onSubmit(fieldsValue)
    })
  }

  handleChangeIsRememberPassword = e => {
    console.log(e)
  }

  render() {
    /*eslint-disable */
    const { title, form, onSubmit, ...others } = this.props
    /*eslint-enable */
    const { getFieldDecorator } = form
    return (
      <div className={styles.formWrap} {...others}>
        <div className={styles.title}>{title}</div>
        <Form
          onSubmit={e => this.handleSubmit(e)}
        >
          <Form.Item>
            {
              getFieldDecorator('phoneNumber', {
                rules: [
                  { required: true, message: '不可为空' },
                  { pattern: regexpMobile, message: '请输入正确的手机号格式'}
                ]
              })(<YiwiseInput
                prefix={<Icon type='user'/>}
                placeholder='请输入手机号'
                allowClear
              />)
            }
          </Form.Item>
          <Form.Item>
            {
              getFieldDecorator('password', {
                rules: [
                  { required: true, message: '不可为空' },
                  { pattern: regexpPassword, message: '请输入6位以上的密码' }
                ]
              })(<YiwiseInput
                prefix={<Icon type='lock'/>}
                placeholder='请输入密码'
                type='password'
                allowClear
              />)
            }
          </Form.Item>
          <div className={styles.operationRow}>
            <Checkbox
              onChange={e => this.handleChangeIsRememberPassword(e)}
            >
              记住密码
            </Checkbox>
          </div>
          <Button
            className={styles.btnLogin}
            type='primary'
            htmlType='submit'
            block
          >登录</Button>
        </Form>
      </div>
    )
  }
}

export default Form.create()(LoginForm)