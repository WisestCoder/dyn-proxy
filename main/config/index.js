const path = require('path')
const fs = require('fs')

/**
 * 获取配置信息
 * @returns config
 */
exports.getConfig = function getConfig() {
	let config
  try {
    config = JSON.parse(fs.readFileSync(path.join(global.rootDir, 'config.json'), 'utf-8'))
  } catch (e) {
    config = {}
  }

  return config
}

/**
 * 更新配置信息
 * @param {*} config
 */
exports.setConfig = function setConfig(config) {
	console.log(config)
  config.updates = {
		now: Date.now(),
		record: JSON.stringify(config)
	}
  fs.writeFileSync(path.join(global.rootDir, 'config.json'), JSON.stringify(config))
}
