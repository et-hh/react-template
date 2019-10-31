import React from 'react'
import { Input, Select } from 'antd'
import PropTypes from 'prop-types'
import './index.scss'

class YiwiseOptionSearch extends React.Component {
  state = {
    activeIndex: this.props.defaultActiveIndex, // 当前option索引
    searchVal: '' // 当前搜索值
  }

  static defaultProps = {
    defaultActiveIndex: 0,
    width: '328px'
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
    const { optionList, width } = this.props
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

YiwiseOptionSearch.propTypes = {
  optionList: PropTypes.array,
  width: PropTypes.string,
  defaultActiveIndex: PropTypes.number
}
export default YiwiseOptionSearch