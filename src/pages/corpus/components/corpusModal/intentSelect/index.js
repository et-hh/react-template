import React from 'react'
import { Select } from 'antd'
import { fetchIntents } from '@/api/mock'

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      intentList: [],
      value: props.value || undefined,
      tmpValue: undefined
    }
  }

  componentDidMount() {
    this.loadData()
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.value
    })
  }

  async loadData() {
    const res = await fetchIntents()
    this.setState({
      intentList: res.data.content
    })
  }

  handleChange = value => {
    value = value.slice(-1)
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
    const { intentList, value } = this.state
    return (
      <Select
        mode='tags'
        placeholder='请选择意图名称'
        value={value}
        optionFilterProp='children'
        defaultActiveFirstOption={true}
        onSearch={e => this.handleSearch(e)}
        onChange={e => this.handleChange(e)}
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