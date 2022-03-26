import React from 'react'
import ButtonGroup from '@/components/ButtonGroup'
import { Switch } from 'antd'
import styles from './index.less'

export const getColumns = ({ onEdit, onDelete, onSwitch }) => ([
	{
		key: 'active',
		dataIndex: 'active',
		title: '开关',
		width: 80,
		render: (value, record) => {
			return (
				<Switch
					size="small"
					checked={value}
					checkedChildren="开"
					unCheckedChildren="关"
					onChange={(isChecked) => {
						onSwitch(isChecked, record)
					}}
				/>
			)
		}
	},
	{ key: 'name', dataIndex: 'name', title: 'name', width: 300 },
	{ key: 'name', dataIndex: 'value', title: 'value', width: 300 },
	{
    title: '操作',
    dataIndex: 'action',
    width: 100,
    fixed: 'right',
    render: (_, record) => {
      return (
        <ButtonGroup
          className={styles['button-group']}
          space={5}
          buttons={[
            {
              type: 'link',
							size: 'small',
              children: '编辑',
              onClick: () => {
                onEdit(record)
              },
            },
            {
              type: 'link',
							size: 'small',
              children: '删除',
              onClick: () => {
                onDelete(record)
              },
            },
          ]}
        />
      )
    },
  }
])

getRandomID.ids = []
export function getRandomID() {
  // window.crypto.randomUUID() 兼容性有问题
  const create = () =>
    Array.prototype.map
      .call(window.crypto.getRandomValues(new Uint8Array(12)), (v) => v.toString(16))
      .join('')

  let id = create()
  while (getRandomID.ids.includes(id)) {
    id = create()
  }

  getRandomID.ids.push(id)

  return id
}
