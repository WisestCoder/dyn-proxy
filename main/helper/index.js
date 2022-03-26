const execSync = require('child_process').execSync;
const util = require('../anyproxy/lib/util')

exports.openCAFile = function openCAFile() {
	const certDir = util.getAnyProxyPath('certificates')
	const isWin = /^win/.test(process.platform);
	if (isWin) {
		execSync('start .', { cwd: certDir });
	} else {
		execSync('open .', { cwd: certDir });
	}
}
