import React from 'react'
import { Button } from 'antd'
import { BatchImportModal } from '@/components'
import { CorpusModal } from './components'

export default class extends React.Component {
  state = {
    corpusModalVisible: false,
    batchModalVisible: false,
    corpusModalType: 'add'
  }

  toggleCorpusVisible(visible, type = 'add') {
    this.setState({
      corpusModalVisible: visible,
      corpusModalType: type
    })
  }

  toggleBatchImportVisible(visible) {
    this.setState({
      batchModalVisible: visible
    })
  }

  handleModalSuccess = () => {
    console.log('添加成功')
  }

  render() {
    const { corpusModalVisible, batchModalVisible, corpusModalType } = this.state
    return (
      <div>
        <Button onClick={() => this.toggleCorpusVisible(true, 'add')}>新建语料</Button>
        <Button onClick={() => this.toggleCorpusVisible(true, 'edit')}>编辑语料</Button>
        <Button onClick={() => this.toggleBatchImportVisible(true)}>批量导入</Button>
        <CorpusModal
          visible={corpusModalVisible}
          type={corpusModalType}
          onToggleVisible={visible => this.toggleCorpusVisible(visible)}
        />
        <BatchImportModal
          visible={batchModalVisible}
          onToggleVisible={visible => this.toggleBatchImportVisible(visible)}
        >
        </BatchImportModal>
      </div>
    )
  }
}