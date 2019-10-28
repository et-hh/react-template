import React from 'react'
import { Select } from 'antd'
import { YiwiseInput, YiwiseTooltip } from '@/components'
import './index.scss'

export default class extends React.Component {
  render() {
    return (
      <div style={{height: '100%'}}>
        <YiwiseInput.Search />
        <YiwiseTooltip title='444' />
        <Select>
          <Select.Option value='3'>33</Select.Option>
        </Select>
      </div>
    )
  }
}