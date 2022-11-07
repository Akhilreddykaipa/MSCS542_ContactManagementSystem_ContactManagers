const { app, BrowserWindow, ipcMain, globalShortcut } = require('electron');
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

app.on('browser-window-focus', function () {
    globalShortcut.register("CommandOrControl+R", () => {
        console.log("CommandOrControl+R is pressed: Shortcut Disabled");
    });
    globalShortcut.register("F5", () => {
        console.log("F5 is pressed: Shortcut Disabled");
    });
});

app.on('browser-window-blur', function () {
    globalShortcut.unregister('CommandOrControl+R');
    globalShortcut.unregister('F5');
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
        let decrypted = utils.caesarDecrypt(el.userpassword, 12);
        console.log("decrypted:");
        console.log(decrypted);
        if (el.useremail === arg.userEmail && decrypted === arg.password) {
          console.log(decrypted);
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

function caesarEncrypt(str, shift) {
  let encrypted = "";
  console.log("utils str: " + str);
  console.log(typeof str);
  for (var i = 0; i < str.length; i++) {
    let code = str.charCodeAt(i);
    if (code >= 65 && code <= 90) {
      encrypted += String.fromCharCode(((code - 65 + shift) % 26) + 65);
    } else if (code >= 97 && code <= 122) {
      encrypted += String.fromCharCode(((code - 97 + shift) % 26) + 97);
    } else {
      encrypted += str.charAt(i).toString();
    }
    console.log(encrypted);
  }
  return String(encrypted);
}

ipcMain.handle('create-account', async (e, arg) => {
  e.preventDefault();
  console.log("password type: " + typeof arg.password);
  let pass = caesarEncrypt((arg.password).toString(), 12);
  return new Promise((resolve, reject) => {
    let duplicateAccount = false;
    db.con.query('select * from employees where email = ?', [arg.email], (err, results) => {
      if (err) {
        console.log("error:", err);
      }
      console.log("checking for existing user");
      results.some((item, i) => {
        console.log(item.email);
        if (item.email === arg.email) {
          console.log("FOUND SAME EMAIL");
          duplicateAccount = true;
          resolve("Error: An account with that email already exists.");
          return true;
        }
      });

      console.log("duplicateAccount:", duplicateAccount);
      if (!duplicateAccount) {
        db.con.query('insert into employees (Fname, Lname, email, phoneNum, WorkNum, gender, age, Department_ID, Supervisor_ID) values(?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [arg.Fname, arg.Lname, arg.email, arg.phoneNum, null, arg.gender, arg.age, arg.Department_ID, arg.Supervisor_ID], (err, results) => {
            if (err) {
              console.log(err);
              resolve(err)
            }
            console.log(results);
        });

        db.con.query('SELECT LAST_INSERT_ID()', [], async (err, results) => {
          let employee_id = Number(Object.values(results[0])[0]);
          console.log("PASS: " + pass);
          console.log(typeof pass);

          console.log("employee id");
          db.con.query('insert into users (userPassword, useremail, usertype, Employees_ID) values(?, ?, ?, ?)',
            [pass, arg.email, arg.userType, employee_id], (err, results) => {
              if (err) {
                console.log(err);
                resolve(err)
              }
              console.log(results);
              resolve(results);
          });
        });
      }
    });
  });
});

ipcMain.handle('set-last-login', async (e, arg) => {
  e.preventDefault();
  return new Promise((resolve, reject) => {
    db.con.query('select * from department', [], (err, results) => {
      if (err) {
        console.log(err);
        resolve(err)
      }
      resolve(results);
    });
  });
});

ipcMain.handle('get-departments', async (e) => {
  e.preventDefault();
  console.log("getting departments");
  return new Promise((resolve, reject) => {
    db.con.query('select * from department', [], (err, results) => {
      if (err) {
        console.log(err);
        resolve(err)
      }
      resolve(results);
    });
  });
});

ipcMain.handle('get-messages', async (e, arg) => {
  e.preventDefault();
  console.log("getting messages");
  return new Promise((resolve, reject) => {
    db.con.query('select * from messages', [], (err, results) => {
      if (err) {
        console.log(err);
        resolve(err)
      }
      resolve(results);
    });
  });
});
