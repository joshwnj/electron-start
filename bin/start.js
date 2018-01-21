#!/usr/bin/env electron

const minimist = require('minimist')

const argv = minimist(process.argv.slice(2))
const dir = process.cwd()
const file = argv._[0]

const fs = require('fs')
const path = require('path')
const { app, BrowserWindow } = require('electron')

const entryPath = resolveEntryPath(dir, file)
const entryExists = fs.existsSync(entryPath)
const fallback = path.join(__dirname, '404.html')

const config = Object.assign(
  {
    width: 600,
    height: 400,
    showDevTools: argv.dev,
    reactDevTools: argv.react,
    watch: true,
    alwaysOnTop: false
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
    'icon',
    'alwaysOnTop'
  ]))

  if (config.watch) {
    const chokidar = require('chokidar')
    const watchPattern = path.dirname(entryPath) + '/**'
    console.log('watching', watchPattern)

    chokidar.watch(watchPattern).on('all', (event, filename) => {
      if (filename !== entryPath) { return }

      switch (event) {
      case 'change':
        win.webContents.executeJavaScript(
          `location.reload()`
        )
        break

      case 'add':
        if (!entryExists) {
          win.webContents.executeJavaScript(
            `location.href = '${entryPath}'`
          )
        }
        break
      }
    })
  }

  win.loadURL(`file:///${entryExists ? entryPath : fallback}`)

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
  const isDir = path.extname(entryPath) === ''

  return isDir
    ? path.join(entryPath, 'index.html')
    : entryPath
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
