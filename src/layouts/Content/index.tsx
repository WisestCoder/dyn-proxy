import { Layout, Breadcrumb } from 'antd'
import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import useBreadcrumb from '@/components/hooks/useBreadcrumb'
import styles from './index.less'

const { Content } = Layout

interface IProps {
  children?: React.ReactElement
  name: string
  showBreadcrumb?: boolean
}

const BgContent = (props: IProps) => {
  const { children, name, showBreadcrumb } = props
  const breadcrumb = useBreadcrumb()

  const breadcrumbs = useMemo(() => [...breadcrumb.slice(0, -1), { name }], [breadcrumb, name])

  return (
    <Content className={styles['content-wrapper']}>
      <div className={styles['main-content']}>
        {showBreadcrumb && breadcrumbs.length > 0 && (
          <Breadcrumb className={styles['breadcrumb-wrapper']}>
            {breadcrumbs.map(({ name: breadcrumbName, link }) => {
              if (link) {
                return (
                  <Breadcrumb.Item key={breadcrumbName}>
                    <Link to={link}>{breadcrumbName}</Link>
                  </Breadcrumb.Item>
                )
              }
              return <Breadcrumb.Item key={breadcrumbName}>{breadcrumbName}</Breadcrumb.Item>
            })}
          </Breadcrumb>
        )}
        {children}
      </div>
    </Content>
  )
}

export default BgContent
