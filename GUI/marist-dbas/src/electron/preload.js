const { contextBridge, ipcRenderer } = require('electron');


contextBridge.exposeInMainWorld('dbConnection', {
  checkLogin: (args) => ipcRenderer.invoke('check-login', (args)).then((result) => {
    return result;
  }),
  createAccount: (args) => ipcRenderer.invoke('create-account', (args)).then((result, reject) => {
    // console.log(result);
    return result;
  }),
  getDepartments: () => ipcRenderer.invoke('get-departments').then((result) => {
    // console.log(result);
    return result;
  }),
  getMessages: (args) => ipcRenderer.invoke('get-messages', (args)).then((result) => {
    return result;
  })
});

// From main.js
ipcRenderer.on('got-login', () => {
  console.log("logged in.");
});
