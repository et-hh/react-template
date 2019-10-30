import React from 'react'
import { Select } from 'antd'
import { fetchIntents } from '@/api/mock'

export default class extends React.Component {
  state = {
    intentList: [],
    value: undefined,
    tmpValue: undefined
  }

  componentDidMount() {
    this.loadData()
  }

  componentWillReceiveProps(nextPorps) {
    this.setState({
      value: nextPorps.value
    })
  }

  async loadData() {
    const res = await fetchIntents()
    this.setState({
      intentList: res.data.content
    })
  }

  handleChange = value => {
    this.setState({
      value
    })
    this.props.onChange && this.props.onChange(value)
  }

  handleSearch = tmpValue => {
    this.setState({
      tmpValue
    })
  }

  handleInputKeyDown = e => {
    const { tmpValue, intentList } = this.state
    const exactExistList = intentList.filter(intent => intent.name === tmpValue)
    if (exactExistList && exactExistList.length) {
      return
    }
    if (e.keyCode === 13) {
      // TODO:
      console.log(tmpValue)
      // TODO: 调用后端
    }
  }

  render() {
    const { intentList } = this.state
    return (
      <Select
        placeholder='请选择标准问题'
        optionFilterProp='children'
        defaultActiveFirstOption={false}
        onSearch={e => this.handleSearch(e)}
        onChange={e => this.handleChange(e)}
        onInputKeyDown={e => this.handleInputKeyDown(e)}
        allowClear
        showSearch
      >
        {
          intentList.map(intent => {
            return (
              <Select.Option
                key={intent.id}
                value={intent.id}
              >
                {intent.name}
              </Select.Option>
            )
          })
        }
      </Select>
    )
  }
}