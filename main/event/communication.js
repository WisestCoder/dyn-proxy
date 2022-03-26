const { ipcMain } = require('electron')
const { getConfig, setConfig } = require('../config')
const util = require('../anyproxy/lib/util')

const MAX_CONTENT_SIZE = 1024 * 2000; // 2000kb

/**
 * 通用监听事件，监听渲染进程的消息，并回执
 * @param {*} eventName
 * @param {*} callback
 */
function listener(eventName, callback) {
	ipcMain.on(eventName, (evt, args) => {
		callback({
			...evt,
			reply: (res) => evt.reply(`${eventName}Apply`,  res)
		}, args)
	})
}


module.exports = function communication() {
	/**
	 * 监听请求数据更新
	 */
	listener('onUpdate', (evt) => {
		global.recorder.on('update', (data) => {
			evt.reply(data)
		});
	})

	/**
	 * 监听获取请求体数据
	 */
	 listener('onFetchRecordBody', (evt, args) => {
		const { id } = args
		let res

		recorder.getDecodedBody(id, (err, result) => {
			// 返回下载信息
			const _resDownload = function (isDownload) {
				isDownload = typeof isDownload === 'boolean' ? isDownload : true;
				return {
					id,
					type: result.type,
					method: result.meethod,
					fileName: result.fileName,
				};
			};

			// 返回内容
			const _resContent = () => {
				if (util.getByteSize(result.content || '') > MAX_CONTENT_SIZE) {
					return _resDownload(true);
				}

				return {
					id,
					type: result.type,
					method: result.method,
					resBody: result.content
				};
			};

			if (err || !result) {
				res = {};
			} else if (result.statusCode === 200 && result.mime) {
				// deal with 'application/x-javascript' and 'application/javascript'
				if (/json|text|javascript/.test(result.mime)) {
					res = _resContent();
				} else if (result.type === 'image') {
					res = _resDownload(false);
				} else {
					res = _resDownload(true);
				}
			} else {
				res = _resContent();
			}

			evt.reply(res)
		});
	})

	/**
	 * 监听获取请求头
	 */
	listener('onFetchHeaderRules', (evt) => {
		const config = getConfig()
		evt.reply(config.headerRules || [])
	})

	/**
	 * 监听更新请求头
	 */
	 listener('onUpdateHeaderRules', (evt, args) => {
		const { newRecords } = args
		const config = getConfig()
		setConfig({
			...config,
			headerRules: newRecords
		})
	})
}
