import React from 'react'
import { Modal } from 'antd'

export default class extends React.Component {
  state = {
    visible: this.props.visible || false
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible &&
      !this.state.visible
    ) {
      this.setState({
        visible: true
      })
      this.props.onOpen && this.props.onOpen()
    }
  }

  hide = () => {
    this.setState({
      visible: false
    })
  }

  handleOk = () => {
    // 弹框的点击有异步函数，暂时传入一个隐藏的回调函数进去
    this.props.onOk && this.props.onOk(this.hide)
  }

  handleCancel = () => {
    this.setState({
      visible: false
    })
    this.props.onCancel && this.props.onCancel()
  }

  render() {
    const { children, ...others } = this.props
    return (
      <Modal
        maskClosable={false}
        {...others}
        onCancel={() => this.handleCancel()}
        onOk={() => this.handleOk()}
        visible={this.state.visible}
      >
        {children}
      </Modal>
    )
  }
}