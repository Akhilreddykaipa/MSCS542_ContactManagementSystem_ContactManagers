const { app, BrowserWindow, ipcMain } = require('electron');
const isDev = require('electron-is-dev');
const http = require('http');
const https = require('https');
const path = require('path');
const url = require('url');
const fs = require('fs');
const db = require('../src/server/db.js');
const utils = require('../src/utils/utils.js');

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
  let admin = false;
  return new Promise((resolve, reject) => {
    db.con.query('select * from users', [], (err, results) => {
      if (err) {
        reject(err)
      }

      results.some((el, i) => {
        if (el.useremail === arg.userEmail && el.userpassword === arg.password) {
          if (el.usertype === "admin") admin = true;
            console.log("USER AUTHENTICATED");
            resolve({
              authenticated: true,
              email: el.useremail,
              admin: admin
            });
            return true;
        }
      });
      resolve({
        authenticated: false,
        email: null,
        admin: null
      });
    });
  });
});

ipcMain.handle('create-account', async (e, arg) => {
  e.preventDefault();
  return new Promise((resolve, reject) => {
    db.con.query('select * from users', [], (err, results) => {
      if (err) {
        reject(err)
      }
      results.some((el, i) => {
        if (el.useremail === arg.userEmail) {
          console.log("USER ALREADY EXISTS");
          resolve("User already exists");
          return true;
        }
      });
    });

    db.con.query('insert into users (userpassword, useremail, usertype) values(?, ?, ?)',
      [arg.userEmail, arg.userpassword, 'employee'], (err, results) => {
        if (err) {
          reject(err)
        }
        console.log(results);
    });
  });
});

ipcMain.handle('get-messages', async (e, arg) => {
  e.preventDefault();
  console.log("getting messages");
  return new Promise((resolve, reject) => {
    db.con.query('select * from messages', [], (err, results) => {
      if (err) {
        reject(err)
      }

      console.log(results);

      results.forEach((el, i) => {
        console.log(el);
      });
      resolve(results);
    });
  });
});
