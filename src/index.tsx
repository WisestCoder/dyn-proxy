import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import React, { FC } from 'react'
import ReactDOM from 'react-dom'
import Layout from './layouts'

import '@/styles/global.less'
import 'antd/dist/antd.css'

dayjs.locale('zh-cn')

const App: FC = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <Layout />
    </ConfigProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
