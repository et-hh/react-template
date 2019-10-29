import React from 'react'
import { Popover, Icon } from 'antd'
import { connect } from 'dva'
import { PaginationTable } from '@/components'
import styles from './index.scss'

@connect()
class TopNav extends React.Component {
  state = {
    visible: false
  }

  handleVisibleChange(visible) {
    this.setState({ visible })

    if (visible) {
      this.table && this.table.loadData()
    }
  }

  render() {
    const columns = [
      { title: '序号', dataIndex: 'name', width: 70, ellipsis: true,
        render: (text, record, index) => {
          return (
            <span>{index + 1}</span>
          )
        }
      },
      { title: '任务类型', dataIndex: 'jobName', width: 100, ellipsis: true },
      { title: '状态', dataIndex: 'resultStatus', width: 120, ellipsis: true },
      { title: '成功', dataIndex: 'successCount', width: 80, ellipsis: true },
      { title: '失败', dataIndex: 'failureCount', width: 80, ellipsis: true },
      { title: '操作人', dataIndex: 'createUserName', width: 100, ellipsis: true },
      { title: '操作时间', dataIndex: 'createTime', width: 180, ellipsis: true },
      { title: '操作', dataIndex: 'operation', width: 100, ellipsis: true,
        render: (text, { url }) => {
          return (
            <a href={url} download>下载</a>
          )
        }
      }
    ]

    const popContent = (
      <div>
        <PaginationTable
          url='/apiPlatform/batch/record/query'
          method='post'
          columns={columns}
          scroll={{ x: 830, y: 300 }}
          headers={{
            'Content-Type': 'application/json;charset=UTF-8'
          }}
          ref={el => this.table = el}
        />
      </div>
    )

    return (
      <Popover
        content={popContent}
        title='导入导出列表'
        trigger='click'
        placement='bottomRight'
        overlayClassName={styles.popover}
        className={this.props.className}
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange.bind(this)}
      >
        <Icon type="container" />
        <span className={styles.username + ' ml5'}>导入导出</span>
      </Popover>
    )
  }
}

export default TopNav