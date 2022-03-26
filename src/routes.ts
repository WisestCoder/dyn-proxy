const routes = [
	// 请求抓包
  {
    link: '/',
    component: () => import('@/pages/Record'),
    name: '请求抓包',
		showMenu: true,
    children: [],
  },

	// 请求抓包
  {
    link: '/modifyheader',
    component: () => import('@/pages/ModifyHeader'),
    name: '修改请求头',
		showMenu: true,
    children: [],
  },
]

export type RouteTypes = typeof routes

export default routes
