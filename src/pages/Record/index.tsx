import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import { Table, Button } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import { updateHandler, COLUMNS } from './helper'
import VirtualTable from './VirtualTable'
import RecordDetail from './RecordDetail'

import styles from './index.less'

const Record: FC = () => {
	const [records, setRecords] = useState([])
	const [visible, setVisible] = useState(false)
	const dataRef = useRef<any>({})

	const onClickItem = useCallback((record) => {
		dataRef.current = record
		setVisible(true)
	}, [])

	const onCloseItem = useCallback(() => {
		setVisible(false)
	}, [])

	const onEmpty = useCallback(() => {
		setRecords([])
	}, [])

	useEffect(() => {
		const { updateListener } = window.proxyAPI;
		updateListener((data) => {
			setRecords((origin) => updateHandler(data, origin))
		})
	}, [])

  return (
		<>
			<div className={styles.header}>
				<Button onClick={onEmpty} size="small" style={{ fontSize: 12 }}>清空</Button>
			</div>
			<Table
				size="small"
				className={styles.table}
				columns={COLUMNS}
				dataSource={records}
				pagination={false}
				onRow={(record) => ({
					onClick: () => onClickItem(record),
					className: record.method === 'CONNECT' ? styles.disabled : ''
				})}
				rowKey="id"
			/>
			<RecordDetail
				visible={visible}
				data={dataRef.current}
				onClose={onCloseItem}
			/>
		</>
	)
}

export default Record
