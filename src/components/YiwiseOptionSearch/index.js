import React from 'react'
import { Input, Select } from 'antd'
import './index.scss'

export default class extends React.Component {
  state = {
    activeIndex: 0, // 当前option索引
    searchVal: '' // 当前搜索值
  }

  handleChangeOption = e => {
    const selectSearchKeyIndex = this.props.optionList.findIndex(option => option.searchKey === e)

    this.setState({
      activeIndex: selectSearchKeyIndex,
      searchVal: ''
    })
  }

  handleChangeVal = e => {
    this.setState({
      searchVal: e.target.value
    })
  }

  handleSearch = e => {
    const { onSearch, optionList } = this.props
    const activeIndex = this.state.activeIndex
    const { searchKey } = optionList[activeIndex]

    onSearch && onSearch({
      [searchKey]: e
    })
  }

  render() {
    const { optionList, width = '328px' } = this.props
    const { activeIndex, searchVal } = this.state
    const {
      searchKey: activeSearchKey,
      placeholder: actionPlaceholder
    } = optionList[activeIndex]

    return (
      <Input.Group
        style={{
          width
        }}
        compact
      >
        <Select
          value={activeSearchKey}
          onChange={e => this.handleChangeOption(e)}
        >
          {
            optionList && optionList.map(option => (
              <Select.Option
                key={option.searchKey}
                value={option.searchKey}
              >{option.label}</Select.Option>
            ))
          }
        </Select>
        <Input.Search
          value={searchVal}
          placeholder={actionPlaceholder}
          onChange={e => this.handleChangeVal(e)}
          onSearch={e => this.handleSearch(e)}
        />
      </Input.Group>
    )
  }
}