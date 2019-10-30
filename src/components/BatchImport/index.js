import React from 'react'
import { Timeline, Upload, Button, Modal } from 'antd'
import cookie from '@/utils/cookie'
import styles from './index.scss'

export default class extends React.Component {
  state = {
    fileList: []
  }

  dotNode(dotText) {
    return <em className={styles.timelineDot}>{dotText}</em>
  }

  handleChange = e => {
    if (!e.fileList || !e.fileList.length) { // remove会触发change事件
      return
    }
    const file = e.file
    if (file.response) {
      file.url = file.response.data.fullURL
    }
    this.setState({
      fileList: [file]
    })
  }

  handleRemove = () => {
    this.setState({
      fileList: []
    })
    return true
  }

  handleCancel = () => {
    this.setState({
      fileList: []
    })
    this.props.onToggleVisible && this.props.onToggleVisible(false)
  }

  get uploadProps() {
    return {
      accept: '.xlsx',
      action: '/apiPlatform/file/upload',
      headers: {
        Authorization: cookie.get('token')
      },
      data: {
        isPermanent: false,
        expireTime: 7,
        checkExcel: true
      },
      onChange: this.handleChange,
      onRemove: this.handleRemove
    }
  }

  render() {
    return (
      <Modal
        visible={this.props.visible}
        title='批量导入'
        okButtonProps={{
          disabled: !this.state.fileList.length
        }}
        onCancel={() => this.handleCancel()}
      >
        <div className={styles.timelineWrap}>
          <Timeline>
            <Timeline.Item dot={this.dotNode(1)}>
              <div className={styles.step1Wrap}>
                <span>填写批量导入的客户模版文件</span>
                {/* <a className={styles.downloadTemplate}>下载模版</a> */}
              </div>
            </Timeline.Item>
            <Timeline.Item dot={this.dotNode(2)}>
              <div className={styles.step2Wrap}>
                <span>上传文件</span>
                <Upload
                  className={styles.uploadWrap}
                  fileList={this.state.fileList}
                  {...this.uploadProps}
                >
                  <Button type='primary'>点击上传</Button>
                </Upload>
                <span>小于10M,且符合模版规范</span>
              </div>
            </Timeline.Item>
          </Timeline>
        </div>
      </Modal>
    )
  }
}