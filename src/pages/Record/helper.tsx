import React from 'react'
import cloneDeep from 'lodash/cloneDeep'
import moment from 'moment'

export function renderStatusCode(v) {
	if (String(v).startsWith('2')) {
		return <span style={{ color: '#2fd000' }}>{v}</span>
	}

	if (String(v).startsWith('3')) {
		return v
	}

	return <span style={{ color: '#ea2020' }}>{v}</span>
}

export const COLUMNS = [
	{ key: 'id', dataIndex: 'id', title: '#', width: 40 },
	{ key: 'method', dataIndex: 'method', title: 'Method', width: 80 },
	{ key: 'statusCode',
		dataIndex: 'statusCode',
		title: 'Status',
		width: 60,
		render: renderStatusCode,
	},
	{ key: 'protocol', dataIndex: 'protocol', title: 'Protocol', width: 60 },
	{ key: 'host', dataIndex: 'host', title: 'Host', width: 200 },
	{ key: 'path', dataIndex: 'path', title: 'Path', width: 200 },
	{ key: 'mime', dataIndex: 'mime', title: 'Mime', width: 100 },
	{
		key: 'startTime',
		dataIndex: 'startTime',
		title: 'Start',
		width: 80,
		render(v) {
			if (!v) {
				return ''
			}

			return moment(v).format('HH:mm:ss')
		}
	},
]

export function updateHandler(newRecord, records): any[] {
	const newRecords = cloneDeep(records)
	const findIndex = newRecords.findIndex(x => x.id === newRecord.id)

	// 新进的数据
	if (findIndex < 0) {
		return newRecords.concat(newRecord)
	}

	// 替换旧数据
	newRecords[findIndex] = newRecord
	return newRecords
}

export function safeJsonParser(jsonStr, defaultV?) {
	try {
		return JSON.parse(jsonStr)
	} catch (error) {
		return defaultV || {}
	}
}
