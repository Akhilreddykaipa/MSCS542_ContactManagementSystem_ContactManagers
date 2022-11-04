const { contextBridge, ipcRenderer } = require('electron');

let doc = document.getElementById("root");
console.log(doc);

const dbc = require('../server/db.js');

ipcRenderer.send('app-start', 'starting application');

contextBridge.exposeInMainWorld('dbConnection', {
  checkLogin: (usr, pwd) => ipcRenderer.send('check-login', [usr, pwd]),
});

ipcRenderer.on('got-login', () => {
  console.log("we got the login!");
});
