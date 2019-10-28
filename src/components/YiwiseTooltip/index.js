import { Tooltip, Icon } from 'antd'

export default function(props) {
  return (
    <Tooltip
      placement='top'
      {...props}
    >
      <Icon type="info-circle" />
    </Tooltip>
  )
}