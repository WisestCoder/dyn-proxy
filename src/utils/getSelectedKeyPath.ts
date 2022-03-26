import { matchPath } from 'react-router'
import { RouteTypes } from '../routes'

// 获取指定节点的路径
export default function getSelectedKeyPath(_menus: RouteTypes, _pathname: string, callback) {
  const paths: RouteTypes = []
  try {
    const getNodePath = (nodes: RouteTypes) => {
      // eslint-disable-next-line no-restricted-syntax
      for (const node of nodes) {
        paths.push(node)
        if (
          matchPath(_pathname, {
            path: node.link,
            exact: true,
          })
        ) {
          throw new Error('get node')
        }
        if (node.children?.length) {
          getNodePath(node.children as any)
          paths.pop()
        } else {
          paths.pop()
        }
      }
    }
    getNodePath(_menus)
  } catch (err) {
    callback(paths)
  }
}
