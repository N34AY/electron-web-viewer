const { screen } = require('electron')


const createWindow = require('./create')


module.exports = async function () {
	return new Promise(async (resolve, reject) => {
		try {
			const displays = screen.getAllDisplays()
			const windows = []

			console.log('displays list:', displays)

			const uiWindow = await createWindow({
				name: 'terminal-ui',
				workArea: displays[0].workArea,
				options: {
					autoHideMenuBar: true,
					fullscreen: true,
					alwaysOnTop: true
				},
				url: 'http://localhost:8080/'
			})
			windows.push(uiWindow)

			// if (displays[1]) {
			// 	const monitorWindow = await createWindow({
			// 		name: 'monitor-window',
			// 		workArea: displays[1].workArea,
			// 		options: {
			// 			autoHideMenuBar: true,
			// 			fullscreen: true,
			// 			alwaysOnTop: true
			// 		},
			// 		url: 'https://www.google.com/'
			// 	})
			// 	windows.push(monitorWindow)
			// }

			// const uiWindow = await createUIWindow(displays[0].workAreaSize)
			// windows.push(uiWindow)
			// console.log('win1 created');

			// if (displays[1]) {
			// 	const monitorWindow = await createMonitorWindow(displays[1].workAreaSize)
			// 	windows.push(monitorWindow)
			// 	console.log('win2 created');
			// }
			console.log('created windows:', windows)
			resolve(windows)
		} catch (error) {
			console.error(error)
			reject(error)
		}
	})
}
