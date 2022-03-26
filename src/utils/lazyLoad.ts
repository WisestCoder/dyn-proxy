import Loadable from 'react-loadable'
import Loading from '@/components/RouteLoading'

const lazyLoadComponent = (component) => {
  return Loadable({
    loader: component,
    loading: Loading,
  })
}

export default lazyLoadComponent
