#!/usr/bin/env electron

const minimist = require('minimist')

const argv = minimist(process.argv.slice(2))
const dir = process.cwd()

const fs = require('fs')
const path = require('path')
const { app, BrowserWindow } = require('electron')
const entryPath = getEntryPath(process.cwd(), process.argv[2])

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

function getEntryPath (dir, f) {
  const entryPath = path.resolve(path.join(dir, f))

  return fs.lstatSync(entryPath).isDirectory()
    ? path.join(entryPath, 'index.html')
    : entryPath
}
