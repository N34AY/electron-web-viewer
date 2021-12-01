const { screen } = require('electron')


const createUIWindow = require('./ui')
const createMonitorWindow = require('./monitor')


module.exports = async function () {
	return new Promise(async (resolve, reject) => {
		try {
			const displays = screen.getAllDisplays()
			const windows = []

			console.log(displays);

			const uiWindow = await createUIWindow(displays[0].workAreaSize)
			windows.push(uiWindow)
			console.log('win1 created');

			if (displays[1]) {
				const monitorWindow = await createMonitorWindow(displays[1].workAreaSize)
				windows.push(monitorWindow)
				console.log('win2 created');
			}

			resolve(windows)
		} catch (error) {
			console.error(error)
			reject(error)
		}
	})
}
