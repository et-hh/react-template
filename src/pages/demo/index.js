import React from 'react'
import { Select, Button } from 'antd'
import { YiwiseInput, YiwiseTooltip, YiwiseOptionSearch } from '@/components'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
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
  state = {
    list: ['3', '5']
  }
  handleAdd = () => {
    const list = this.state.list
    list.push(Math.random() * 100)
    this.setState({
      list
    })
  }
  render() {
    return (
      <div style={{height: '100%'}}>
        <YiwiseInput.Search />
        <YiwiseTooltip title='444' />
        <Select>
          <Select.Option value='3'>33</Select.Option>
        </Select>
        <YiwiseOptionSearch defaultActiveIndex='1' optionList={optionList} />
        <TransitionGroup>
          {
            this.state.list.map(item => {
              return (
                <CSSTransition classNames='fade' key={item} timeout={500}>
                  <div style={{ border:  '1px solid red'}}>{item}</div>
                </CSSTransition>
              )
            })
          }
        </TransitionGroup>
        <Button onClick={() => this.handleAdd()}>添加</Button>
      </div>
    )
  }
}