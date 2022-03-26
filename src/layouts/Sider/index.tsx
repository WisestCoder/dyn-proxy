import React, { Fragment } from 'react'
import { Layout, Menu, } from 'antd'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { useSelector } from '@/store/index'
import routes, { RouteTypes } from '../../routes'
import logo from '../../assets/logo.png'

import styles from './index.less'

const { Sider } = Layout
const { SubMenu } = Menu

const BgSider = () => {
	const { collapsed, setCollapsed } = useSelector(state => state.global)

  const renderMenus = (menus: RouteTypes) => {
    return menus.map((menu) => (
			<Fragment key={menu.link}>
				{
					menu.showMenu
						? (
							<Menu.Item>
								<Link to={menu?.link || ''}>{menu.name}</Link>
							</Menu.Item>
						)
						: null
				}
				{
					Array.isArray(menu.children) && menu.children.length > 0
						? (
							<SubMenu title={menu.name}>
								{renderMenus(menu.children || [])}
							</SubMenu>
						)
						: null
				}
			</Fragment>
		))
  }

  return (
		<Sider
			className={styles['sider-wrap']}
			width={180}
			theme="light"
			collapsible
			collapsed={collapsed}
			onCollapse={setCollapsed}
		>
			<div className={styles.logo}>
				<img src={logo} />
				<img src={logo} />
				<img src={logo} />
			</div>
			<Menu mode="inline" defaultActiveFirst>
				{renderMenus(routes)}
			</Menu>
		</Sider>
  )
}

export default observer(BgSider)
