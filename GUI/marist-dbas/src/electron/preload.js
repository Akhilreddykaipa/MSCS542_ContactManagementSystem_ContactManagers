const { contextBridge, ipcRenderer } = require('electron');


contextBridge.exposeInMainWorld('dbConnection', {
  checkLogin: (args) => ipcRenderer.invoke('check-login', (args)).then((result) => {
    return result;
  }),
});

// From main.js
ipcRenderer.on('got-login', () => {
  console.log("we got the login!");
});
