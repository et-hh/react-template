import React from 'react'
import { Form, Radio, Modal } from 'antd'
import { YiwiseInput } from '@/components'
import IntentSelect from './intentSelect'
import QuestionList from './questionList'
import StandardQuestionSelect from './standardQuestionSelect'
import {
  corpusTypeEnum
} from '../../util'

class CorpusModal extends React.Component {

  componentWillReceiveProps(nextProps) {
    const { visible, type } = nextProps
    if (visible && !this.props.visible) {
      this.loadData(type)
    }
  }

  loadData(modalType) {
    const { setFieldsValue } = this.props.form
    if (modalType === 'edit') {
      // TODO:
      setFieldsValue({
        corpusType: 'intent',
        questionList: ['3333'],
        intentId: '5db7b0fde56c6e1ff38e5840'
      })
    }
  }

  handleOk(close) {
    close()
    // const { form } = this.props
    // const { validateFields } = form
    // validateFields((errors, values) => {
    //   if (errors) return

    //   // onSuccess(values)
    //   // onToggle(false)
    // })
  }

  handleCancel() {
    const { form, onToggleVisible } = this.props
    form.resetFields()
    onToggleVisible && onToggleVisible(false)
  }

  get formItemLayout() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 }
    }
  }

  questionListValidator(rule, value, callback) {
    if (!value) {
      return callback(new Error('请输入语料问法'))
    }

    for(let item of value) {
      if (!item) {
        return callback(new Error('存在空的语料问法'))
      } else if (item.length > 200) {
        return callback(new Error('语料问法不超过200字'))
      }
    }

    const unDuplicateValue = [...new Set(value)]
    if (unDuplicateValue.length < value.length) {
      return callback(new Error('问法存在重复'))
    }
    callback()
  }

  renderForm() {
    const { getFieldDecorator, getFieldValue } = this.props.form
    return (
      <Form layout='horizontal'>
        <Form.Item label='语料归类' {...this.formItemLayout}>
          {
            getFieldDecorator('corpusType', {
              rules: [{
                required: true, message: '语料归类'
              }],
              initialValue: 'intent'
            })(
              <Radio.Group>
                {
                  Object.keys(corpusTypeEnum).map(corpusTypeKey => {
                    return (
                      <Radio
                        key={corpusTypeKey}
                        value={corpusTypeKey}
                      >{corpusTypeEnum[corpusTypeKey]}</Radio>
                    )
                  })
                }
              </Radio.Group>
            )
          }
        </Form.Item>
        {
          getFieldValue('corpusType') === 'intent'
          ? (
            <Form.Item label='意图名称' {...this.formItemLayout}>
              {
                getFieldDecorator('intentId', {
                  rules: [{
                    required: true, message: '请选择意图名称'
                  }],
                  initialValue: undefined
                })(
                  <IntentSelect />
                )
              }
            </Form.Item>
          )
          : (
            <Form.Item label='标准问题' {...this.formItemLayout}>
            {
              getFieldDecorator('standardQuestion', {
                rules: [{
                  required: true, message: '请选择标准问题'
                }],
                initialValue: undefined
              })(
                <StandardQuestionSelect />
              )
            }
          </Form.Item>
          )
        }
        <Form.Item prop='questionList' label='语料问法' {...this.formItemLayout}>
          {
            getFieldDecorator('questionList', {
              rules: [
                { validator: this.questionListValidator }
              ],
              initialValue: []
            })(
              <QuestionList />
            )
          }
        </Form.Item>
        <Form.Item label='场景名称' {...this.formItemLayout}>
          {
            getFieldDecorator('scene', {
            })(
              <YiwiseInput />
            )
          }
        </Form.Item>
      </Form>
    )
  }

  render() {
    const { visible, type } = this.props
    return (
      <Modal
        title={type === 'add' ? '新建语料' : '编辑语料'}
        visible={visible}
        onOpen={() => this.onOpen()}
        onOk={() => this.handleOk()}
        onCancel={() => this.handleCancel()}
      >
        {this.renderForm()}
      </Modal>
    )
  }
}

export default Form.create()(CorpusModal)