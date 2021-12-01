// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
// const log = require('electron-log')
// log.transports.console.level = 'debug'
// Object.assign(console, log.functions)

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
      const element = document.getElementById(selector)
      if (element) element.innerText = text
    }
  
    for (const type of ['chrome', 'node', 'electron']) {
      replaceText(`${type}-version`, process.versions[type])
    }
  })
  