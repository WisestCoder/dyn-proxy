const { app } = require('electron')
const { checkIsOpenProxy, toggleProxyOpen } = require('../proxy')
const AnyProxy = require('../anyproxy')
const { openCAFile } = require('../helper')

const menus = [
  {
    label: 'DynProxy',
    submenu: [
			{
				label: '开启代理',
				type: 'checkbox',
				checked: checkIsOpenProxy(),
				click: function (item, focusedWindow) {
					toggleProxyOpen()
				},
			},
			{
				label: '安装证书',
				click: function (item, focusedWindow) {
					if (!AnyProxy.utils.certMgr.ifRootCAFileExists()) {
						AnyProxy.utils.certMgr.generateRootCA((error) => {
							if (!error) {
								openCAFile()
							} else {
								console.error('error when generating rootCA', error);
							}
						});
					} else {
						openCAFile()
					}
				},
			}
    ]
  },
  {
    label: '设置',
    role: 'window',
    submenu: [{
      label: '切换全屏',
      accelerator: (function () {
        if (process.platform === 'darwin') {
          return 'Ctrl+Command+F'
        } else {
          return 'F11'
        }
      })(),
      click: function (item, focusedWindow) {
        if (focusedWindow) {
          focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
        }
      }
    }, {
      label: '最小化',
      accelerator: 'CmdOrCtrl+M',
      role: 'minimize'
    }, {
      label: '关闭',
      accelerator: 'CmdOrCtrl+W',
      role: 'close'
    }, {
      type: 'separator'
    }]
  }
]

module.exports = menus
