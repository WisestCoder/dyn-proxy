const { contextBridge, ipcRenderer } = require('electron')

function dispatch(eventName, args, callback) {
	if (typeof args === 'function' && typeof callback === 'undefined') {
		callback = args
		args = {}
	}

	if(callback) {
		ipcRenderer.on(`${eventName}Apply`, callback)
	}
	ipcRenderer.send(eventName, args);
}

contextBridge.exposeInMainWorld('proxyAPI', {
	// 监听请求更新
	updateListener(callback) {
		dispatch('onUpdate', (e, data) => {
			callback(data)
		})
	},

	// 获取请求体数据
	fetchRecordBody(id, callback) {
		dispatch('onFetchRecordBody', { id }, (e, data) => {
			callback(data)
		})
	},

	// 获取用户定义的请求头
	fetchHeaderRules(callback) {
		dispatch('onFetchHeaderRules', (e, data) => {
			callback(data)
		})
	},

	// 更新用户定义的请求头
	updateHeaderRules(newRecords) {
		dispatch('onUpdateHeaderRules', { newRecords })
	},
})
