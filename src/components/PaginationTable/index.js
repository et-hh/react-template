/**
 * props
 * pagination - 分页器设置
 * method     - 请求方式
 * headers    - 请求头
 * columns    - 列配置 详见 https://ant.design/components/table-cn/
 * url        - 请求地址
 * data       - 外部传入数据
 */
import { Table, Checkbox } from 'antd'
import React from 'react'
import request from '@/utils/request'
import guid from '@/utils/guid'
export default class extends React.Component {
  state = {
    innerData: [],
    loading: false,
    total: 0,
    selectedRowKeys: [],
    checked: false,
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
    data: undefined,
  }

  componentDidMount() {
    if (!this.props.data) {
      this.loadData()
    }
  }

  showTotal = () => {
    return `共 ${this.props.data ? this.props.data.length : this.state.total} 条`
  }
  // eslint-disable-next-line
  onShowSizeChange = (_, pageSize) => {
    // 切换单页显示数目
    this.loadData({ pageNum: 1, pageSize })
  }

  onChange = (pageNum, pageSize) => {
    // 切换页码
    this.loadData({ pageNum, pageSize })
  }

  onSelectChange = selectedRowKeys => {
    if (this.state.checked && !this.props.data) {
      this.setState({ selectedRowKeys: [] })
    } else {
      this.setState({ selectedRowKeys })
    }
    this.setState({ checked: false })
  }

  onCheckAll = checked => {
    if (checked) {
      const data = this.props.data || this.state.innerData
      const selectedRowKeys = data.map(it => it.key)
      this.setState({ selectedRowKeys, checked: true })
    } else {
      this.setState({ selectedRowKeys: [], checked: false })
    }
  }

  loadData = async (innerParams = {}) => {
    // 请求参数
    const { url, method, headers, params } = this.props
    // 加载数据
    const { defaultPageSize, defaultCurrent } = this.props.pagination

    const { selectedRowKeys: originSelectedRowKeys, checked } = this.state

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
      const total = data.totalElements
      const innerData = data.content.map(it => ({
        ...it,
        key: it.id || it.key || guid(),
      }))
      // 如果全选是开着的那么翻页的时候也全选
      const selectedRowKeys = checked
        ? Array.from(new Set(originSelectedRowKeys.concat(innerData.map(it => it.key))))
        : originSelectedRowKeys

      this.setState({
        total,
        innerData: innerData,
        selectedRowKeys,
      })
    } catch (error) {
      this.setState({ loading: false })
      return
    }
    this.setState({ loading: false })
  }
  render() {
    const { selectedRowKeys, checked } = this.state
    const { selection, data } = this.props

    const selectionProps = selection && {
      rowSelection: {
        selectedRowKeys,
        onChange: this.onSelectChange,
      },
    }

    return (
      <div>
        {selection && (
          <div style={{ marginBottom: '10px' }}>
            <Checkbox
              onChange={e => this.onCheckAll(e.target.checked)}
              checked={this.state.checked}
            >
              全选
            </Checkbox>
            <span>
              已选择
              {checked
                ? data
                  ? selectedRowKeys.length
                  : this.state.total
                : selectedRowKeys.length}
              项
            </span>
          </div>
        )}
        {!!data ? (
          <Table
            {...this.props}
            {...selectionProps}
            dataSource={data}
            pagination={{
              ...this.props.pagination,
              showTotal: this.showTotal,
              total: data.length,
            }}
            className="PaginationTable"
          />
        ) : (
          <Table
            {...this.props}
            {...selectionProps}
            dataSource={this.state.innerData}
            pagination={{
              ...this.props.pagination,
              showTotal: this.showTotal,
              total: this.state.total,
              onChange: this.onChange,
              onShowSizeChange: this.onShowSizeChange,
            }}
            loading={this.state.loading}
            className="PaginationTable"
          />
        )}
      </div>
    )
  }
}
