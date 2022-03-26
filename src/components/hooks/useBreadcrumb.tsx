import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import getSelectedKeyPath from '@/utils/getSelectedKeyPath'
import routes from '../../routes'

export default function useBreadcrumb() {
  const location = useLocation()
  const [breadcrumb, setBreadcrumb] = useState([])

  useEffect(() => {
    getSelectedKeyPath(routes, location.pathname, (paths: any[]) => {
      setBreadcrumb(paths)
    })
  }, [location.pathname])

  return breadcrumb
}
