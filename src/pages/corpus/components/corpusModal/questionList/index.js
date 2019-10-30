import React from 'react'
import { Icon } from 'antd'
import { YiwiseInput } from '@/components'
import styles from './index.scss'

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: props.value || []
    }
  }

  componentWillReceiveProps(nextPorps) {
    this.setState({
      value: nextPorps.value
    })
  }

  handleAddRow = () => {
    const value = this.state.value
    value.push('')
    this.setState({
      value
    })
  }

  handleDelRow = index => {
    const value = this.state.value
    value.splice(index, 1)
    this.setState({
      value
    })
  }

  handleChange = (e, index) => {
    const value = this.state.value
    value[index] = e.target.value
    this.setState({
      value
    })
    this.props.onChange && this.props.onChange(value)
  }

  render() {
    const { value } = this.state
    return (
      <div className={styles.questionListWrap}>
        <div className={styles.questionList}>
          {
            value && value.map((item, index) => {
              return (
                <div className={styles.questionItem} key={index}>
                  <YiwiseInput.TextArea
                    placeholder={`请输入语料问法${index + 1}`}
                    className={styles.questionInput}
                    maxLength={200}
                    value={item}
                    onChange={e => this.handleChange(e, index)}
                  />
                  <Icon type='delete' onClick={() => this.handleDelRow(index)}/>
                </div>
              )
            })
          }
        </div>
        <span className={styles.addRow} onClick={() => this.handleAddRow()}>
          <Icon type='plus' />
          添加
        </span>
      </div>
    )
  }
}