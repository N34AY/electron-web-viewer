const { app, BrowserWindow } = require('electron')


const createAllwindows = require('./src/windows/createAll')

const startArgs = process.argv
console.log(startArgs)

app.commandLine.appendSwitch ("disable-http-cache")
app.commandLine.appendSwitch ("--disk-cache-size=0")


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
  await createAllwindows()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createAllwindows()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
