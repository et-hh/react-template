/**
 * props
 * pagination - 分页器设置
 * method     - 请求方式
 * headers    - 请求头
 * columns    - 列配置 详见 https://ant.design/components/table-cn/
 */
import { Table, Checkbox } from 'antd'
import React from 'react'
import request from '@/utils/request'
import guid from '@/utils/guid'
export default class extends React.Component {
  state = {
    data: [
      {
        key: '1',
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号',
      },
      {
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号',
      },
    ],
    loading: false,
    total: 0,
    selectedRowKeys: []
  }

  static defaultProps = {
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      defaultPageSize: 20,
      defaultCurrent: 1,
    },
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }
  componentDidMount() {
    this.loadData()
  }

  showTotal = () => {
    return `共 ${this.state.total} 条`
  }
  onShowSizeChange = (current, pageSize) => {
    // 切换单页显示数目
    this.loadData({ pageNum: 1, pageSize })
  }

  onChange = (pageNum, pageSize) => {
    // 切换页码
    this.loadData({ pageNum, pageSize })
  }

  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys })
  }

  onCheckAll = (checked) => {
    if(checked) {
      const { data } = this.state
      const selectedRowKeys = []
      for (const item of data ){
        selectedRowKeys.push(item.key)
      }
      this.setState({selectedRowKeys})
    }else {
      this.setState({selectedRowKeys: []})
    }
  }

  loadData = async (innerParams = {}) => {
    // 请求参数
    const { url, method, headers, params } = this.props

    // 加载数据
    const { defaultPageSize, defaultCurrent } = this.props.pagination

    // 合并参数
    const newParams = Object.assign(
      { pageSize: defaultPageSize, pageNum: defaultCurrent },
      params,
      innerParams,
    )

    try {
      this.setState({ loading: true })
      let data
      if (method === 'get') {
        data = (await request(url, {
          params: newParams,
          method,
          headers,
        })).data
      } else {
        data = (await request(url, {
          data: newParams,
          method,
          headers,
        })).data
      }
      this.setState({
        total: data.totalElements,
        data: data.content.map((it) => ({
          ...it,
          key: it.id || it.key || guid(),
        })),
      })
    } catch (error) {
      this.setState({ loading: false })
      return
    }
    this.setState({ loading: false })
  }
  render() {
    const { selectedRowKeys } = this.state
    const { columns, selection } = this.props

    const selectionProps = selection && {
      rowSelection:  {
        selectedRowKeys,
        onChange: this.onSelectChange
      }
    }

    return (
      <div>
        { selection &&
          <div style={{marginBottom: '10px'}}>
            <Checkbox onChange={(e) => this.onCheckAll(e.target.checked)}>全选</Checkbox>
            <span>已选择{selectedRowKeys.length}项</span>
          </div>
        }
        <Table
          {...this.props}
          {...selectionProps}
          loading={this.state.loading}
          dataSource={this.state.data}
          pagination={{
            ...this.props.pagination,
            showTotal: this.showTotal,
            onShowSizeChange: this.onShowSizeChange,
            onChange: this.onChange,
            total: this.state.total,
          }}
          columns={columns}
          className="PaginationTable"
        />
      </div>
    )
  }
}
