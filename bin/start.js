#!/usr/bin/env electron

const dir = process.cwd()

const path = require('path')
const { app, BrowserWindow } = require('electron')

const entryPath = path.resolve(path.join(process.cwd(), process.argv[2]))

app.on('ready', () => {
  const win = new BrowserWindow({
    width: 600,
    height: 400
  })

  win.loadURL(`file:///${entryPath}`)
})


