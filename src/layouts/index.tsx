import React, { useMemo, lazy, Suspense } from 'react'
import { Layout } from 'antd'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import PageNotFound from '@/pages/404'
import routes, { RouteTypes } from '../routes'
import Content from './Content'
import styles from './index.less'
import Sider from './Sider'
import ErrorBoundary from './ErrorBoundary'

interface RouteProps {
  link: string
  component?: () => any
  showHeader?: boolean
  showSider?: boolean
  children?: any[]
  name?: string
}

const BgLayout = () => {
  const Routers = useMemo(() => {
    function renderRouter(menus: RouteTypes) {
      return menus.map((item: RouteProps) => {
        const { link, component, name, children } = item
        const Component = lazy(component)

        return [
          <Route
            exact
            key={link}
            path={link}
            render={(props) => {
              return (
                <Content name={name} {...props}>
                  <ErrorBoundary>
                    <Suspense fallback={<div>Loading...</div>}>
                      <Component />
                    </Suspense>
                  </ErrorBoundary>
                </Content>
              )
            }}
          />,
          ...renderRouter(children || []),
        ]
      })
    }

    return renderRouter(routes)
  }, [])

  return (
    <Router>
			<Layout style={{ height: '100vh' }} className={styles['layout-wrap']}>
				<Sider />
				<Switch>
					{Routers}
					<Route component={PageNotFound} />
				</Switch>
			</Layout>
    </Router>
  )
}

export default observer(BgLayout)
