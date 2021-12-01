const { BrowserWindow } = require('electron')
const path = require('path')


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
			})
			window.name = 'monitor'

			// add window content
			window.loadURL('http://3.70.247.201:3000/')
			// mainWindow.loadFile('video.html')

			// return window object if window ready
			window.once('ready-to-show', () => {
				window.show()
				resolve(window)
			})
		} catch (error) {
			console.error(error)
			reject(error)
		}
	})
}

