import { createContext, useContext } from 'react'
import GlobalStore from './global'

const combine = {
  global: new GlobalStore(),
}

type Store = typeof combine

export const storeContext = createContext(combine)

export const useStore = (): Store => {
  return useContext(storeContext)
}

export function useSelector<TSelected = unknown>(selector: (state: Store) => TSelected): TSelected {
  const all = useStore()
  return selector(all)
}
