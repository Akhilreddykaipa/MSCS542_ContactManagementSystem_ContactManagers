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
        console.log("Refresh shortcut has been disabled.");
    });
    globalShortcut.register("F5", () => {
        console.log("Refresh shortcut has been disabled.");
    });
});

app.on('browser-window-blur', function () {
    globalShortcut.unregister('CommandOrControl+R');
    globalShortcut.unregister('F5');
});

//
//
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
        if (el.useremail === arg.userEmail && decrypted === arg.password) {
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
  let pass = utils.caesarEncrypt(arg.password, 12);
  return new Promise((resolve, reject) => {
    let duplicateAccount = false;
    db.con.query('select * from Employees where email = ?', [arg.email], (err, results) => {
      if (err) {
        console.log("error:", err);
      }
      console.log("checking for existing user");
      results.some((item, i) => {
        if (item.email === arg.email) {
          duplicateAccount = true;
          resolve("Error: An account with that email already exists.");
          return true;
        }
      });

      if (!duplicateAccount) {
        db.con.query('insert into Employees (Fname, Lname, email, phoneNum, WorkNum, gender, age, Department_ID, Supervisor_ID) values(?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [arg.Fname, arg.Lname, arg.email, arg.phoneNum, null, arg.gender, arg.age, arg.Department_ID, arg.Supervisor_ID], (err, results) => {
            if (err) {
              console.log(err);
              resolve(err)
            }
            console.log(results);
        });

        db.con.query('SELECT LAST_INSERT_ID()', [], async (err, results) => {
          let employee_id = Number(Object.values(results[0])[0]);
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

ipcMain.handle('set-new-password', async (e, arg) => {
  e.preventDefault();
  let newPass = utils.caesarEncrypt(arg.pass, 12);
  let userEmail = arg.email;
  return new Promise((resolve, reject) => {
    db.con.query('UPDATE users SET userpassword = ? where useremail = ?;', [newPass, userEmail], (err, results) => {
      if (err) {
        console.log(err);
        resolve(err);
      }
      resolve(results);
    });
  });
});

ipcMain.handle('set-last-login', async (e, arg) => {
  e.preventDefault();
  return new Promise((resolve, reject) => {
    db.con.query('select * from Department', [], (err, results) => {
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
  return new Promise((resolve, reject) => {
    db.con.query('select * from Department', [], (err, results) => {
      if (err) {
        console.log(err);
        resolve(err)
      }
      console.log(results);
      resolve(results);
    });
  });
});

ipcMain.handle('set-departments', async (e, arg) => {
  e.preventDefault();
  return new Promise((resolve, reject) => {
    db.con.query('UPDATE Department SET DName=? WHERE ID =?',
      [arg.DName, Number(arg.ID)], (err, results) => {
      if (err) {
        console.log(err);
        resolve(err)
      }
      console.log(results);
      resolve(results);
    });
  });
});

ipcMain.handle('get-supervisors', async (e) => {
  e.preventDefault();
  return new Promise((resolve, reject) => {
    db.con.query('select * from Supervisor', [], (err, results) => {
      if (err) {
        console.log(err);
        resolve(err)
      }
      resolve(results);
    });
  });
});

ipcMain.handle('set-supervisors', async (e, arg) => {
  console.log(arg);
  e.preventDefault();
  return new Promise((resolve, reject) => {
    db.con.query('UPDATE Supervisor SET UserID=?, DepartmentID=? WHERE ID =?',
      [arg.UserID, arg.DepartmentID, Number(arg.ID)], (err, results) => {
      if (err) {
        console.log(err);
        resolve(err)
      }
      resolve(results);
    });
  });
});

ipcMain.handle('get-users', async (e) => {
  e.preventDefault();
  return new Promise((resolve, reject) => {
    db.con.query('select * from users', [], (err, results) => {
      if (err) {
        console.log(err);
        resolve(err)
      }
      resolve(results);
    });
  });
});

ipcMain.handle('set-users', async (e, arg) => {
  e.preventDefault();
  Object.keys(arg).forEach((item, i) => {
    if (String(arg[item]).length === 0) {
      arg[item] = null;
    }
  });
  return new Promise((resolve, reject) => {
    db.con.query('UPDATE users SET userpassword=?, useremail=?, usertype=?, loginkey=? WHERE userlogin =?',
      [arg.userpassword, arg.useremail, arg.usertype, arg.loginkey, Number(arg.userlogin)], (err, results) => {
      if (err) {
        console.log(err);
        resolve(err)
      }
      resolve(results);
    });
  });
});

ipcMain.handle('delete-user', (e, arg) => {
  e.preventDefault();
  return new Promise((resolve, reject) => {
    db.con.query('DELETE from users WHERE useremail =?',
      [arg.email], (err, results) => {
      if (err) {
        console.log(err);
        resolve(err)
      }
      db.con.query('DELETE from Employees WHERE email =?',
        [arg.email], (err, results) => {
        if (err) {
          console.log(err);
          resolve(err)
        }
        resolve(results);
      });
    });
  });
});

ipcMain.handle('get-employees', async (e) => {
  e.preventDefault();

  return new Promise((resolve, reject) => {
    db.con.query('select * from Employees', [], (err, results) => {
      if (err) {
        console.log(err);
        resolve(err)
      }
      resolve(results);
    });
  });
});

ipcMain.handle('get-employee-ids', async (e, arg) => {
  e.preventDefault();

  return new Promise((resolve, reject) => {
    db.con.query('select * from Employees where email = ?', [arg.email], (err, results) => {
      if (err) {
        console.log(err);
        resolve(err)
      }
      resolve(results);
    });
  });
});

ipcMain.handle('set-employees', async (e, arg) => {
  e.preventDefault();
  Object.keys(arg).forEach((item, i) => {
    if (String(arg[item]).length === 0) {
      arg[item] = null;
    }
  });

  return new Promise((resolve, reject) => {
    db.con.query('UPDATE Employees SET Fname=?, Lname=?, email=?, phoneNum=?, WorkNum=?, gender=?, age=?, Department_ID=?, Supervisor_ID=? WHERE ID =?',
      [arg.Fname, arg.Lname, arg.email, arg.phoneNum, arg.WorkNum, arg.gender, arg.age, arg.Department_ID, arg.Supervisor_ID, arg.ID], (err, results) => {
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
  return new Promise((resolve, reject) => {
    db.con.query('select * from Messages', [], (err, results) => {
      if (err) {
        console.log(err);
        resolve(err)
      }
      resolve(results);
    });
  });
});

ipcMain.handle('set-messages', async (e, arg) => {
  console.log(arg);
  e.preventDefault();
  Object.keys(arg).forEach((item, i) => {
    if (String(arg[item]).length === 0) {
      arg[item] = null;
    }
  });
  console.log(arg);

  return new Promise((resolve, reject) => {
    db.con.query('UPDATE Messages SET senderID=?, userID=?, groupID=?, Message=?, Messagedate=? WHERE ID =?',
      [arg.senderID, arg.userID, arg.groupID, arg.Message, arg.Messagedate, arg.ID], (err, results) => {
      if (err) {
        console.log(err);
        resolve(err)
      }
      resolve(results);
    });
  });
});

ipcMain.handle('get-email-history', async (e, arg) => {
  e.preventDefault();
  return new Promise((resolve, reject) => {
    db.con.query('select * from EmailHistory', [], (err, results) => {
      if (err) {
        console.log(err);
        resolve(err)
      }
      resolve(results);
    });
  });
});

ipcMain.handle('get-group-members', async (e, arg) => {
  e.preventDefault();
  return new Promise((resolve, reject) => {
    db.con.query('select * from GroupMembers', [], (err, results) => {
      if (err) {
        console.log(err);
        resolve(err)
      }
      resolve(results);
    });
  });
});

ipcMain.handle('set-group-members', async (e, arg) => {
  e.preventDefault();
  return new Promise((resolve, reject) => {
    db.con.query('UPDATE GroupMembers SET GroupID=?, UserID=?, JoinDate=? WHERE ID =?',
      [arg.GroupID, arg.UserID, arg.JoinDate, arg.ID], (err, results) => {
      if (err) {
        console.log(err);
        resolve(err)
      }
      resolve(results);
    });
  });
});

ipcMain.handle('get-group-details', async (e, arg) => {
  e.preventDefault();
  return new Promise((resolve, reject) => {
    db.con.query('select * from GroupDetails', [], (err, results) => {
      if (err) {
        console.log(err);
        resolve(err)
      }
      resolve(results);
    });
  });
});

ipcMain.handle('set-group-details', async (e, arg) => {
  e.preventDefault();
  return new Promise((resolve, reject) => {
    db.con.query('UPDATE GroupDetails SET LeaderID=?, GroupName=?, CreatedDate=? WHERE ID =?',
      [arg.LeaderID, arg.GroupName, arg.CreatedDate, arg.ID], (err, results) => {
      if (err) {
        console.log(err);
        resolve(err)
      }
      resolve(results);
    });
  });
});

ipcMain.handle('get-contacts', async (e, arg) => {
  e.preventDefault();
  return new Promise((resolve, reject) => {
    db.con.query('select * from Relationship', [], (err, results) => {
      if (err) {
        console.log(err);
        resolve(err)
      }
      resolve(results);
    });
  });
});

ipcMain.handle('set-contacts', async (e, arg) => {
  e.preventDefault();
  return new Promise((resolve, reject) => {
    db.con.query('UPDATE Relationship SET user1ID=?, user2ID=?, Rstatus=?, Rdate=? WHERE ID =?',
      [Number(arg.user1ID), Number(arg.user2ID), arg.Rstatus, arg.Rdate, Number(arg.ID)], (err, results) => {
      if (err) {
        console.log(err);
        resolve(err)
      }
      resolve(results);
    });
  });
});

ipcMain.handle('create-contact', async (e, arg) => {
  e.preventDefault();
  return new Promise((resolve, reject) => {
    db.con.query('insert into Relationship (user1ID, user2ID, Rstatus, Rdate) values(?, ?, ?, CURDATE())',
      [arg.user1ID, arg.user2ID, arg.Rstatus], (err, results) => {
      if (err) {
        console.log(err);
        resolve(err)
      }
      resolve(results);
    });
  });
});

ipcMain.handle('delete-contact', async (e, arg) => {
  e.preventDefault();
  return new Promise((resolve, reject) => {
    db.con.query('DELETE from Relationship WHERE user2ID =?',
      [arg.user2ID], (err, results) => {
      if (err) {
        console.log(err);
        resolve(err)
      }
      resolve(results);
    });
  });
});

ipcMain.handle('get-certified', async (e, arg) => {
  e.preventDefault();
  return new Promise((resolve, reject) => {
    db.con.query('select * from Certified', [], (err, results) => {
      if (err) {
        console.log(err);
        resolve(err)
      }
      resolve(results);
    });
  });
});

ipcMain.handle('set-certified', async (e, arg) => {
  console.log(arg);
  e.preventDefault();
  return new Promise((resolve, reject) => {
    db.con.query('UPDATE Certified SET UserID=?, CertificationID=?, CertDate=? WHERE ID =?',
      [Number(arg.UserID), Number(arg.CertificationID), arg.CertDate, Number(arg.ID)], (err, results) => {
      if (err) {
        console.log(err);
        resolve(err)
      }
      resolve(results);
    });
  });
});

ipcMain.handle('get-certifications', async (e, arg) => {
  console.log(arg);
  e.preventDefault();
  return new Promise((resolve, reject) => {
    db.con.query('select * from Certification', [], (err, results) => {
      if (err) {
        console.log(err);
        resolve(err)
      }
      resolve(results);
    });
  });
});

ipcMain.handle('set-certifications', async (e, arg) => {
  console.log(arg);
  e.preventDefault();
  return new Promise((resolve, reject) => {
    db.con.query('UPDATE Certification SET Name=?, Type=? WHERE ID =?',
      [arg.Name, arg.Type, Number(arg.ID)], (err, results) => {
      if (err) {
        console.log(err);
        resolve(err)
      }
      resolve(results);
    });
  });
});
