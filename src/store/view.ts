import { observable, action, makeObservable } from 'mobx'

export type SettingType = 'global' | 'form' | 'table' | 'tableField' | 'formField'

export type EntityAdd = {
  entityId?: string
  dataMap: Record<string, any>
}

export type Setting = {
  type?: SettingType
  preview?: boolean
  form?: Record<string, any>
  global?: Record<string, any>
  table?: Record<string, any>
  tableField?: Record<string, any>
  formField?: Record<string, any>
}

export default class ViewStore {
  static DefaultValue = {
    entityAdd: {
      dataMap: {},
    } as EntityAdd,
    setting: {
      type: 'global',
      preview: false,
      form: {
        showExpand: true,
        expandCount: 9,
        alignCount: 3,
      },
      table: {
        settable: true,
      },
      tableField: {
        columns: [],
      },
      formField: {
        fields: [],
      },
    } as Setting,
  }

  @observable
  setting: Setting = ViewStore.DefaultValue.setting

  @observable
  entityAdd: EntityAdd = ViewStore.DefaultValue.entityAdd

  constructor() {
    makeObservable(this)
  }

  @action
  setSettingType = (newType: SettingType) => {
    this.setting.type = newType
  }

  @action
  setSettingPreview = (newPreview: boolean) => {
    this.setting.preview = newPreview
  }

  @action
  setSettingDataByType = ({ type, data }: { type: SettingType; data: Record<string, any> }) => {
    this.setting[type] = data
  }

  @action
  setSettingData = (newData: Setting) => {
    this.setting = {
      ...this.setting,
      ...newData,
    }
  }

  @action
  resetFormAndTable = () => {
    this.setting = {
      ...this.setting,
      table: ViewStore.DefaultValue.setting.table,
      tableField: ViewStore.DefaultValue.setting.tableField,
      form: ViewStore.DefaultValue.setting.form,
      formField: ViewStore.DefaultValue.setting.formField,
    }
  }

  @action
  setEntityId = (newId) => {
    this.entityAdd.entityId = newId
  }

  @action
  setEntityDataMap = (dataMap) => {
    this.entityAdd.dataMap = dataMap
  }
}
