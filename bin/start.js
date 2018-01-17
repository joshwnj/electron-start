#!/usr/bin/env electron

const minimist = require('minimist')

const argv = minimist(process.argv.slice(2))
const dir = process.cwd()

const fs = require('fs')
const path = require('path')
const { app, BrowserWindow } = require('electron')

const entryPath = getEntryPath(process.cwd(), argv._[0])

const config = Object.assign(
  {
    width: 600,
    height: 400,
    showDevTools: argv.dev,
    reactDevTools: argv.react
  },
  argv.c
    ? require(path.resolve(argv.c))
    : {}
)

app.on('ready', () => {
  const win = new BrowserWindow(pluckObj(config, [
    'width',
    'height',
    'titleBarStyle',
    'title',
    'icon'
  ]))

  win.loadURL(`file:///${entryPath}`)

  setupDevTools(config, (err) => {
    if (err) {
      console.error('setupDevTools failed:', err)
      return
    }

    if (config.showDevTools) {
      win.webContents.openDevTools({ mode: 'detach' })
    }
  })
})

function setupDevTools (config, cb) {
  if (config.reactDevTools) {
    const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer')

    installExtension(REACT_DEVELOPER_TOOLS)
      .then(() => cb())
      .catch(cb)
  } else {
    cb()
  }
}

function resolveEntryPath (dir, f) {
  const entryPath = f && path.isAbsolute(f) ? f : path.resolve(path.join(dir, f || '.'))

  return fs.lstatSync(entryPath).isDirectory()
    ? path.join(entryPath, 'index.html')
    : entryPath
}

function getEntryPath (dir, f) {
  const entryPath = resolveEntryPath(dir, f)

  return fs.existsSync(entryPath)
    ? entryPath
    : path.join(__dirname, '404.html')
}

function pluckObj (obj, keys) {
  const objKeys = Object.keys(obj)
  const output = {}
  keys.forEach(k => {
    if (objKeys.indexOf(k) >= 0) {
      output[k] = obj[k]
    }
  })
  return output
}
