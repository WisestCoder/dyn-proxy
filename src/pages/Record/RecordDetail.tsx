import React, { FC, useEffect, useState, memo } from 'react'
import { Drawer, DrawerProps, Tabs } from 'antd'
import ReactJson from 'react-json-view'
import Title from '@/components/Title'
import { renderStatusCode, safeJsonParser } from './helper'
import styles from './index.less'

interface IProps extends DrawerProps {
	data?: any
}

const RecordDetail: FC<IProps> = ({ data, visible, ...otherProps }) => {
	const [detail, setDetail] = useState<any>({})

	useEffect(() => {
		if (visible && data?.id) {
			const { fetchRecordBody } = window.proxyAPI
			fetchRecordBody(data.id, (record) => {
				setDetail({
					...data,
					...record
				})
			})
		}
	}, [visible])

	return (
		<Drawer className={styles.drawer} width={800} visible={visible} {...otherProps}>
			<Tabs defaultActiveKey="Request">
				<Tabs.TabPane tab="Request" key="Request1">
					<div className={styles.detailBox}>
						<Title sign>General</Title>
						<div className={styles.detailLine}><label>URL:</label>{detail.url}</div>
						<div className={styles.detailLine}><label>Method:</label>{detail.method}</div>
						<div className={styles.detailLine}><label>Protocol:</label>{detail.protocol}</div>
					</div>
					<div className={styles.detailBox}>
						<Title sign>Header</Title>
						{
							Object.keys(detail.reqHeader || {}).map((headerKey) => (
								<div className={styles.detailLine} key={headerKey}><label>{headerKey}:</label>{detail.reqHeader[headerKey]}</div>
							))
						}
					</div>
					<div className={styles.detailBox}>
						<Title sign>Body</Title>
						<Tabs size="small" className={styles.bodyTab}>
								<Tabs.TabPane tab="Source" key="Source">
									<div className={styles.bodyTabSource}>{detail.reqBody}</div>
								</Tabs.TabPane>
								<Tabs.TabPane tab="Preview" key="Preview">
									<ReactJson src={safeJsonParser(detail.reqBody)} style={{ fontSize: 12 }} />
								</Tabs.TabPane>
							</Tabs>
					</div>
				</Tabs.TabPane>
				<Tabs.TabPane tab="Response" key="Response2">
					<div className={styles.detailBox}>
							<Title sign>General</Title>
							<div className={styles.detailLine}>
								<label>Status Code:</label>
								<span className={styles[detail.statusCode]}>{renderStatusCode(detail.statusCode)}</span>
							</div>
						</div>
						<div className={styles.detailBox}>
							<Title sign>Header</Title>
							{
								Object.keys(detail.resHeader || {}).map((headerKey) => (
									<div className={styles.detailLine} key={headerKey}><label>{headerKey}:</label>{detail.resHeader[headerKey]}</div>
								))
							}
						</div>
						<div className={styles.detailBox}>
							<Title sign>Body</Title>
							<Tabs size="small" className={styles.bodyTab}>
								<Tabs.TabPane tab="Source" key="Source">
									<div className={styles.bodyTabSource}>{detail.resBody}</div>
								</Tabs.TabPane>
								<Tabs.TabPane tab="Preview" key="Preview">
									<ReactJson src={safeJsonParser(detail.resBody)} style={{ fontSize: 12 }} />
								</Tabs.TabPane>
							</Tabs>
						</div>
				</Tabs.TabPane>
			</Tabs>
		</Drawer>
	)
}

export default memo(RecordDetail)
