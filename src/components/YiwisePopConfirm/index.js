import { Popconfirm } from 'antd'

export default function(props) {
  function handleConfirm(e) {
    const onConfirm = props.onConfirm
    onConfirm && onConfirm(e)
  }

  function handleCancel(e) {
    const onCancel = props.onCancel
    onCancel && onCancel(e)
  }

  return (
    <Popconfirm
      okText='确定'
      cancelText='取消'
      onConfirm={handleConfirm}
      onCancel={handleCancel}
      {...props}
    >
      {props.children}
    </Popconfirm>
  )
}