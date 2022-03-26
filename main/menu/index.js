const electron = require('electron');
const Menu = electron.Menu;

module.exports = function createMenu() {
	const menus = require('./menu')
  const menu = Menu.buildFromTemplate(menus)
  Menu.setApplicationMenu(menu)
}
