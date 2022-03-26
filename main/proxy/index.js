const AnyProxy = require('../anyproxy')
const fs = require('fs')
const path = require('path')
const { getConfig, setConfig } = require('../config')
const customizedRule = require('../rule')

const PROXY_PORT = 5050
const WEB_INTERFACE_PORT = 5051

let proxyServer
const options = {
	port: PROXY_PORT,
	rule: customizedRule,
	throttle: 10000,
	forceProxyHttps: true,
	wsIntercept: true,
	silent: false,
	webInterface: false,
	// webInterface: {
  //   enable: true,
  //   webPort: WEB_INTERFACE_PORT
  // }
};

exports.PROXY_PORT = PROXY_PORT
exports.WEB_INTERFACE_PORT = WEB_INTERFACE_PORT

function checkIsOpenProxy() {
	return getConfig().isOpen
}

function startProxy() {
	const execSync = require('child_process').execSync;

	if (!AnyProxy.utils.certMgr.ifRootCAFileExists()) {
		AnyProxy.utils.certMgr.generateRootCA((error, keyPath) => {
			// let users to trust this CA before using proxy
			if (!error) {
				const certDir = require('path').dirname(keyPath);
				console.log('The cert is generated at', certDir);
				const isWin = /^win/.test(process.platform);
				if (isWin) {
					execSync('start .', { cwd: certDir });
				} else {
					execSync('open .', { cwd: certDir });
				}
			} else {
				console.error('error when generating rootCA', error);
			}
		});
	}

	proxyServer = proxyServer || new AnyProxy.ProxyServer(options);

	proxyServer.on('ready', () => {
		const isOpenProxy = checkIsOpenProxy()
		if (isOpenProxy) {
			enableProxy()
		}
	});

	proxyServer.on('error', (e) => {
		if (proxyServer) {
			proxyServer.close()
		}
	});

	proxyServer.start();
}
function enableProxy() {
	// 开启全局代理服务器
	AnyProxy.utils.systemProxyMgr.enableGlobalProxy('127.0.0.1', options.port, 'http');
	AnyProxy.utils.systemProxyMgr.enableGlobalProxy('127.0.0.1', options.port, 'https');
}

function disableProxy() {
	// 关闭全局代理服务器
	AnyProxy.utils.systemProxyMgr.disableGlobalProxy('http');
	AnyProxy.utils.systemProxyMgr.disableGlobalProxy('https');
}

function toggleProxyOpen() {
	const proxyInfo = getConfig()
	proxyInfo.isOpen = !proxyInfo.isOpen

	if (proxyInfo.isOpen) {
		// 开启全局代理服务器
		enableProxy()
	} else {
		// 关闭全局代理服务器
		disableProxy()
	}

	setConfig(proxyInfo)
}

exports.startProxy = startProxy
exports.getConfig = getConfig
exports.checkIsOpenProxy = checkIsOpenProxy
exports.toggleProxyOpen = toggleProxyOpen
exports.enableProxy = enableProxy
exports.disableProxy = disableProxy
