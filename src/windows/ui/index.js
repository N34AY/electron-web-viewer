const { BrowserWindow } = require('electron')
const path = require('path')


const handleLogging = require('./../../logging')


module.exports = function (workArea) {
	return new Promise((resolve, reject) => {
		try {
			// create window
			const window = new BrowserWindow({
				width: workArea.width,
				height: workArea.height,
				autoHideMenuBar: true,
				fullscreen: true,
				alwaysOnTop: true,
				webPreferences: {
					preload: path.join(__dirname, 'preload.js'),
					nodeIntegration: true
				}
			})
			window.name = 'UI'

			// add window content
			// window.loadURL('http://localhost:8080', { "extraHeaders": "pragma: no-cache\n" })
			window.loadURL('https://www.google.com/', { "extraHeaders": "pragma: no-cache\n" })
			// window.loadFile('index.html')

			// enable debugger 
			window.webContents.debugger.attach('1.3')
			window.webContents.debugger.sendCommand('Network.enable')
			window.webContents.debugger.sendCommand('Runtime.enable')

			// add logging
			handleLogging(window)

			// return window object if window ready
			window.once('ready-to-show', () => {
				window.show()
				console.log('showed');
				resolve(window)
			})
		} catch (error) {
			console.error(error)
			reject(error)
		}
	})
}
