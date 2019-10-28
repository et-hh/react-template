import React from 'react'
import { Input } from 'antd'
import YiwiseColorIcon from '../YiwiseColorIcon'
import './index.scss'

class YiwiseInput extends React.Component {
  render() {
    return (
      <Input
        allowClear={true}
        {...this.props}
      />
    )
  }
}

class YiwiseSearchInput extends React.Component {
  handlePressEnter() {
    const onSearch = this.props.onSearch
    onSearch && onSearch()
  }

  render() {
    return (
      <YiwiseInput
        prefix={
          <YiwiseColorIcon
            type='iconsousuox'
            onClick={() => this.handlePressEnter()}
          />
        }
        onPressEnter={() => this.handlePressEnter()}
      />
    )
  }
}

YiwiseInput.Search = YiwiseSearchInput

export default YiwiseInput