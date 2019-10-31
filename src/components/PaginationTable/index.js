/**
 * props
 * pagination - 分页器设置
 * method     - 请求方式
 * headers    - 请求头
 * columns    - 列配置 详见 https://ant.design/components/table-cn/
 * url        - 请求地址
 * data       - 外部传入数据
 */
import { Table } from 'antd'
import React from 'react'
import request from '@/utils/request'
import guid from '@/utils/guid'
export default class extends React.Component {
  state = {
    innerData: [],
    loading: false,
    total: 0,
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
        innerData: data.content.map(it => ({
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
    return !!this.props.data ? (
      <Table
        {...this.props}
        dataSource={this.props.data}
        pagination={{
          ...this.props.pagination,
          showTotal: this.showTotal,
          total: this.props.data.length,
        }}
        className="PaginationTable"
      />
    ) : (
      <Table
        {...this.props}
        dataSource={this.state.innerData}
        pagination={{
          ...this.props.pagination,
          showTotal: this.showTotal,
          total: this.state.total,
          onChange: this.onChange,
          onShowSizeChange: this.onShowSizeChange,
        }}
        loading={this.loading}
        className="PaginationTable"
      />
    )
  }
}
