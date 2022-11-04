const { contextBridge, ipcRenderer } = require('electron');

let doc = document.getElementById("root");
console.log(doc);

const dbc = require('../server/db.js');

ipcRenderer.send('some-name', 'sending a message');

contextBridge.exposeInMainWorld('dbConnection', {
  doThing: () => ipcRenderer.send('some-name', 'sending a message')
});
