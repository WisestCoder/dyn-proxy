import React, { FC, useCallback, useEffect } from 'react'
import { Modal, Form, Input, Select } from 'antd'
import { ModalProps } from 'antd/lib/modal'
import { getRandomID } from './helper'

interface IProps extends ModalProps {
  onOk?: (p: any) => void
  mode?: 'add' | 'edit'
	data: Record<string, any>
}

const ModifyHeaderModal: FC<IProps> = ({ onOk = () => {}, mode, data, visible, ...otherProps }) => {
  const [form] = Form.useForm()

  const onModalOk = useCallback(() => {
		form.validateFields()
			.then((values) => {
				onOk({
					uniqKey: getRandomID(),
					...values,
				})
			})
	}, [onOk])

	useEffect(() => {
		if (visible) {
			if (mode === 'add') {
				form.setFieldsValue({
					proxyRule: 'all'
				})
			} else {
				form.setFieldsValue(data)
			}
		}
	}, [visible])

  return (
    <Modal
			width={600}
			title={mode === 'add' ? '新增' : '编辑'}
			visible={visible}
			onOk={onModalOk}
			{...otherProps}
		>
      <Form form={form} labelCol={{ span: 5 }} wrapperCol={{ span: 18 }}>
        <Form.Item label="name" name="name" rules={[{ required: true }]}>
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="value" name="value" rules={[{ required: true }]}>
          <Input placeholder="请输入" />
        </Form.Item>
				<Form.Item label="匹配规则" name="proxyRule" rules={[{ required: true }]}>
          <Select
						options={[
							{ label: '全部命中', value: 'all' },
							{ label: '包含匹配', value: 'contains' },
							{ label: '正则匹配', value: 'regexp' },
						]}
						placeholder="请选择"
					/>
        </Form.Item>
				<Form.Item dependencies={['proxyRule']} noStyle>
					{({ getFieldValue }) => {
						return getFieldValue('proxyRule') !== 'contains'
							? null
							: (
								<Form.Item label="包含字符串" name="contains" rules={[{ required: true }]}>
									<Input placeholder='请输入' />
								</Form.Item>
							)
					}}
				</Form.Item>
				<Form.Item dependencies={['proxyRule']} noStyle>
					{({ getFieldValue }) => {
						return getFieldValue('proxyRule') !== 'regexp'
							? null
							: (
								<Form.Item label="正则表达式" name="regexp" rules={[{ required: true }]}>
									<Input placeholder='请输入' />
								</Form.Item>
							)
					}}
				</Form.Item>
      </Form>
    </Modal>
  )
}

export default ModifyHeaderModal
	/**
	 * 修改请求头
	 * [
	 * 	 {
	 * 		 uniqKey: 'fjweofjwo'
	 *     name: "User-Agent",
	 * 		 value: "DynProxy/1.0",
	 * 		 active: true,
	 * 		 proxyRule: 'all' | 'contains' | 'regexp'
	 * 		 contains: "www.baidu.com"
	 * 	 }
	 * ]
	 */
