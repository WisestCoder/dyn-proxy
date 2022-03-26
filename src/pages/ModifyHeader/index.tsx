import React, { useCallback, useMemo, useEffect, useState, useRef } from 'react'
import { Table } from 'antd'
import ButtonGroup from '@/components/ButtonGroup'
import cloneDeep from 'lodash/cloneDeep'
import ModifyHeaderModal from './ModifyHeaderModal'
import { getColumns } from './helper'

import styles from './index.less'

/**
 * 修改请求头
 * [
 * 	 {
 *     name: "User-Agent",
 * 		 value: "DynProxy/1.0",
 * 		 active: true,
 * 		 proxyRule: 'all' | 'contains' | 'regexp'
 * 		 contains: "www.baidu.com"
 * 	 }
 * ]
 */

const ModifyHeader = () => {
	const [record, setRecords] = useState([])
	const [visible, setVisible] = useState(false)
	const modalRef = useRef<any>({})

	const updateRecord = useCallback((values) => {
		const { mode, data } = modalRef.current

		setRecords((origin) => {
			const newRecords = cloneDeep(origin)
			if (mode === 'add') {
				newRecords.push(values)
			} else {
				const findIndex = newRecords.findIndex(x => x.uniqKey === data.uniqKey)
				newRecords[findIndex] = values
			}

			const { updateHeaderRules } = window.proxyAPI
			updateHeaderRules(newRecords)

			return newRecords
		})
	}, [])

	const onAdd = useCallback(() => {
		setVisible(true)
		modalRef.current = {
			mode: 'add',
			data: {}
		}
	}, [])

	const onEdit = useCallback((record) => {
		setVisible(true)
		modalRef.current = {
			mode: 'edit',
			data: record
		}
	}, [])

	const onSwitch = useCallback((active, record) => {
		modalRef.current = {
			mode: 'edit',
			data: record
		}

		updateRecord({
			...record,
			active,
		})
	}, [updateRecord])

	const onDelete = useCallback(() => {}, [])

	useEffect(() => {
		const { fetchHeaderRules } = window.proxyAPI
		fetchHeaderRules((records) => {
			setRecords(records)
		})
	}, [])

	const columns = useMemo<any>(() => getColumns({ onEdit, onDelete, onSwitch }), [onEdit, onDelete, onSwitch])

	return (
		<>
			<div className={styles.header}>
				<ButtonGroup
					space={10}
					buttons={[
						{ children: '新增项', size: 'small', type: 'primary', style: { fontSize: 12 }, onClick: onAdd },
						{ children: '导入', size: 'small', style: { fontSize: 12 } },
						{ children: '导出', size: 'small', style: { fontSize: 12 } }
					]}
				/>
			</div>
			<Table
				size="small"
				className={styles.table}
				columns={columns}
				dataSource={record}
				pagination={false}
				rowKey="uniqKey"
			/>
			<ModifyHeaderModal
				mode={modalRef.current.mode}
				data={modalRef.current.data}
				visible={visible}
				onCancel={() => {
					setVisible(false)
				}}
				onOk={(values) => {
					updateRecord(values)
					setVisible(false)
				}}
			/>
		</>
	)
}

export default ModifyHeader
