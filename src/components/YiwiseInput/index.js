import { Input } from 'antd'
import './index.scss'

export default function(props) {
  return (
    <Input
      allowClear={true}
      {...props}
    />
  )
}