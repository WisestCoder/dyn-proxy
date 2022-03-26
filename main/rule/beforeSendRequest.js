const { getConfig } = require('../config')
const { json2Buffer } = require('../anyproxy/lib/util')

/**
   *
   *
   * @param {object} requestDetail
   * @param {string} requestDetail.protocol
   * @param {object} requestDetail.requestOptions
   * @param {object} requestDetail.requestData
   * @param {object} requestDetail.response
   * @param {number} requestDetail.response.statusCode
   * @param {object} requestDetail.response.header
   * @param {buffer} requestDetail.response.body
   * @returns
   */
module.exports = function *beforeSendRequest(requestDetail) {
	const config = getConfig()
	const newRequestOptions = requestDetail.requestOptions;

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
	const headerRules = config.headerRules || []

	console.log('headerRules', headerRules)

	if (headerRules.length) {
		headerRules.forEach(({ name, value, active, proxyRule, contains, regexp }) => {
			if (!active) {
				return
			}

			if (proxyRule === 'all') {
				newRequestOptions.headers[name] = value
			} else if (proxyRule === 'contains' && contains && requestDetail.url.includes(contains)) {
				newRequestOptions.headers[name] = value
			} else if (proxyRule === 'regexp' && regexp && new RegExp(regexp).test(requestDetail.url)) {
				newRequestOptions.headers[name] = value
			}
		})
	}

	/**
	 * 修改请求数据
	 */

	/**
	 * 修改请求协议
	 */

	/**
	 * 修改返回头
	 */

	/**
	 * 修改返回数据
	 */

	return {
		requestOptions: newRequestOptions,
		// requestData: json2Buffer({ limit: 20, offset: 0 })
	};
}
