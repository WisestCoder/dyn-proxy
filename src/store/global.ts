import { observable, action, makeObservable } from 'mobx'

export type UserInfo = {
  nick?: string
  backUrl?: string
}

export default class GlobalStore {
  @observable
  collapsed: boolean = false

  constructor() {
    makeObservable(this)
  }

  @action
  setCollapsed = (collapsed: boolean) => {
    this.collapsed = collapsed
  }
}
