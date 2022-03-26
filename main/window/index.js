const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;
const path = require('path')
const { WEB_INTERFACE_PORT } = require('../proxy')

let loadingScreen

function createLoading() {
  loadingScreen  = new BrowserWindow({
    width: 600,
    height: 200,
    frame: false,
    show: false,
    parent: global.mainWindow
  });

	loadingScreen.loadURL(`file://${path.resolve(__dirname)}/loading.html`);

  loadingScreen.on('closed', () => loadingScreen = null);
  loadingScreen.webContents.on('did-finish-load', () => {
    loadingScreen.show();
  });

	return loadingScreen
}

function createWindow() {
	createLoading(loadingScreen)

	global.mainWindow = new BrowserWindow({
    width: 1300,
    height: 800,
		icon: path.resolve(__dirname, '../../icon.png'),
    backgroundColor: '#fff',
		show: false,
		title: '代理工具', // todo 为啥不生效
		webPreferences: {
			preload: path.resolve(__dirname, '../payload.js')
		}
	});
	global.mainId = global.mainWindow.id;
	global.mainWindow.setTitle('代理工具');

	if (process.env.NODE_ENV === 'development') {
		global.mainWindow.loadURL(`http://localhost:${WEB_INTERFACE_PORT}/`);
		global.mainWindow.webContents.openDevTools(); // 打开调试工具
	} else {
		global.mainWindow.loadURL(`file://${__dirname}/client/index.html`);
	}

	global.mainWindow.webContents.on('did-finish-load', () => {
		global.mainWindow.show();
		if (loadingScreen) {
			loadingScreen.close();
		}
	});

	global.mainWindow.on('closed', () => {
		global.mainWindow = null;
	});
}

module.exports = createWindow
