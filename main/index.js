const path = require('path')
const fs = require('fs')
const os = require('os')
const electron = require('electron')
const mkdirp = require('mkdirp')
const app = electron.app

const createWindow = require('./window')
const createMenu = require('./menu')
const handleQuit = require('./event/quit')
const communication = require('./event/communication')
const { startProxy } = require('./proxy')

global.mainWindow = null
global.rootDir = path.join(os.homedir(), '.dynproxy')

if (!fs.existsSync(rootDir)) {
  mkdirp.sync(rootDir)
}

startProxy()

app.on('ready', () => {
	createWindow()
	createMenu()
	handleQuit()
	communication()
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (global.mainWindow === null) {
		createWindow()
	}
})
