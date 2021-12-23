const { BrowserWindow } = require('electron')


module.exports = function createWindow({ name, workArea, options, url, file }) {
  return new Promise((resolve, reject) => {
    try {
      // create window
      const window = new BrowserWindow({
        x: workArea.x,
        y: workArea.y,
        width: workArea.width,
        height: workArea.height,
        autoHideMenuBar: options.autoHideMenuBar,
        fullscreen: options.fullscreen,
        alwaysOnTop: options.alwaysOnTop,
      })
      window.name = name

      // add window content
      if (file && url) throw Error('Set url or file')
      if (url) window.loadURL(url, { "extraHeaders": "pragma: no-cache\n" })
      if (file) window.loadFile(file)

      // return window object if window ready
      window.once('ready-to-show', () => {
        window.show()
        console.log(`window '${name}' created!`)
        resolve(window)
      })
    } catch (error) {
      console.error(error)
      reject(error)
    }
  })
}
