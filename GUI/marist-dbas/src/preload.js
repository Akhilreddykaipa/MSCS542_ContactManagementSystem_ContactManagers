const { contextBridge, ipcRenderer } = require('electron');
// const fs = require('fs');

const dbc = require('./server/db.js');

ipcRenderer.send('some-name', 'sending a message');

contextBridge.exposeInMainWorld('dbConnection', {
  doThing: () => ipcRenderer.send('some-name', 'sending a message')
});
