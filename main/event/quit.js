/**
 * 程序退出监控
 */
const { app, BrowserWindow, dialog, ipcMain } = require('electron')
const { disableProxy } = require('../proxy')
let hasQuit = false

function checkQuit(mainWindow, event) {
  const options = {
    type: 'info',
    title: '关闭确认',
    message: '确认要关闭程序吗？',
    buttons: ['确认', '取消']
  };
	dialog.showMessageBox(options)
		.then(({ response }) => {
			if (response === 0) {
				disableProxy()
				hasQuit = true;
				mainWindow = null;
				app.exit(0);
			}
		})
}

module.exports = function handleQuit() {
  const mainWindow = BrowserWindow.fromId(global.mainId);
  mainWindow.on('close', event => {
    event.preventDefault();
    checkQuit(mainWindow, event);
  });
  app.on('window-all-closed', () => {
    if (!hasQuit) {
      if (process.platform !== 'darwin') {
				disableProxy()
        hasQuit = true;
        ipcMain.removeAllListeners();
        app.quit();
      }
    }
  });
}
