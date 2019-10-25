import React from 'react'
import { Result, Button } from 'antd'
import router from 'umi/router'

export default () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist"
    extra={
      <Button
        type="primary"
        onClick={() => router.push('/')}
      >
        回到首页
      </Button>
    }
  />
)