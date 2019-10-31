import React from 'react'
import { Select } from 'antd'
import { YiwiseInput, YiwiseTooltip, YiwiseOptionSearch } from '@/components'
import './index.scss'

const optionList = [
  {
    searchKey: 'scene',
    label: '场景名称',
    placeholder: '请输入场景名称'
  },
  {
    searchKey: 'intent',
    label: '相似问题',
    placeholder: '请输入相似问题'
  }
]

export default class extends React.Component {
  render() {
    return (
      <div style={{height: '100%'}}>
        <YiwiseInput.Search />
        <YiwiseTooltip title='444' />
        <Select>
          <Select.Option value='3'>33</Select.Option>
        </Select>
        <YiwiseOptionSearch optionList={optionList} />
      </div>
    )
  }
}