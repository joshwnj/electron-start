#!/usr/bin/env electron

const minimist = require('minimist')

const argv = minimist(process.argv.slice(2))
const dir = process.cwd()

const path = require('path')
const { app, BrowserWindow } = require('electron')

const entryFilename = getEntryFilename(process.argv[2])
const entryPath = path.resolve(path.join(process.cwd(), entryFilename))
const config = Object.assign(
  {
    width: 600,
    height: 400
  },
  argv.c
    ? require(path.resolve(argv.c))
    : {}
)

app.on('ready', () => {
  const win = new BrowserWindow({
    width: config.width,
    height: config.height
  })

  win.loadURL(`file:///${entryPath}`)
})

function getEntryFilename (f) {
  return (!f || f === '.')
   ? 'index.html'
    : f
}
