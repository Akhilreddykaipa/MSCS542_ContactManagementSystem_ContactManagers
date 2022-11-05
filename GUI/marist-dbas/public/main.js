const { app, BrowserWindow, ipcMain } = require('electron');
const isDev = require('electron-is-dev');
const http = require('http');
const https = require('https');
const path = require('path');
const url = require('url');
const fs = require('fs');
const db = require('../src/server/db.js');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
      width: 1280,
      height: 900,
      minWidth: 1000,
      minHeight: 640,
      autoHideMenuBar: true,
      title: "Marist Database Administrators",
      webPreferences: {
        preload: path.join(__dirname, '../src/electron/preload.js'),
        enableRemoteModule: true,
        nodeIntegration: true
      }
    });

    if (isDev) {
      mainWindow.loadURL('http://localhost:3000');
      mainWindow.webContents.openDevTools();
    } else {
      mainWindow.loadURL(`file://${path.join(__dirname, '../build/index.html')}`);
    }

    mainWindow.setTitle("Marist Database Administrators");
    mainWindow.setBackgroundColor('#232323');
    mainWindow.on('closed', function () {
        mainWindow = null
    });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});

// Received from ipcRenderer
ipcMain.on('app-start', (e, args) => {
  console.log("received from preload: ", args);
});

ipcMain.handle('check-login', async (e, arg) => {
  e.preventDefault();
  return new Promise((resolve, reject) => {
    db.con.query('select * from users', [], (err,results) => {
      if(err){
        reject(err)
      }
      results.forEach((el, i) => {
        if (el.useremail === arg.userEmail) {
          if (el.userpassword === arg.password) {
            console.log("USER AUTHENTICATED");
            resolve(true);
          } else {
            console.log("DID NOT AUTHENTICATE");
            resolve(false);
          }
        }
      });
      resolve(false);
    });
  });
});
