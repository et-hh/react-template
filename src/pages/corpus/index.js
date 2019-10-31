import React, { PureComponent } from 'react'
import { Input, Select, Button, Checkbox } from 'antd'
import { PaginationTable } from '@/components'
import styles from './index.scss'

const { Option } = Select
const { Search } = Input
const CheckboxGroup = Checkbox.Group

export default class corpus extends PureComponent {
  state = {}

  render() {
    const options = [
      { label: '场景名称',value: 0},
      { label: '意图名称', value: 1},
      { label: '标准问题', value: 2},
      { label: '相似问题', value: 3},
      { label: '问题ID', value: 4}
    ]

    const tOptions = [
      { label: '意图语料', value: 'Apple' },
      { label: '知识库语料', value: 'Pear' },
      { label: '会话日志语料', value: 'Orange' }]

    const columns = [
      {
        title: '语料id',
        dataIndex: 'name',
        key: 'name',
        width: 200
      },
      {
        title: '意图名称/标准问题',
        dataIndex: 'age',
        key: 'age',
        width: 300
      },
      {
        title: '语料问法',
        dataIndex: 'address',
        key: 'address',
        width: 200
      },
      {
        title: '场景名称',
        dataIndex: 'address1',
        key: 'address1',
        width: 200
      },
      {
        title: '语料归类',
        dataIndex: 'address2',
        key: 'address2',
        width: 200
      },
      {
        title: '操作',
        dataIndex: 'address3',
        key: 'address3',
        render: () => (
          <span>
            <Button type="link">编辑</Button>
            <Button type="link">删除</Button>
            <Button type="link">添加到导出列表</Button>
          </span>
        )
      }
    ]

    return (
      <div className={styles.panel}>
        <Select defaultValue={options[0].value} style={{ width: 120 }}>
          { options.map( item => (<Option key={item.value} value={item.value}>{item.label}</Option>)) }
        </Select>
        <Search
          placeholder="查询问题"
          className={styles.search}
          onSearch={value => console.log(value)}
          style={{ width: 280 }}
        />
        <Button type="primary" style={{marginLeft: '16px'}}>新建语料</Button>
        <div>
          <Checkbox>
            全部
          </Checkbox>
          <CheckboxGroup
            options={tOptions}
          />
          <Button style={{marginLeft: '16px'}}>添加到导出列表</Button>
          <Button style={{marginLeft: '16px'}}>导入</Button>
          <Button style={{marginLeft: '16px'}}>导出</Button>
          <Button style={{marginLeft: '16px'}}>删除</Button>
        </div>
        <PaginationTable
          selection={true}
          columns={columns}/>
      </div>
    )
  }
}





