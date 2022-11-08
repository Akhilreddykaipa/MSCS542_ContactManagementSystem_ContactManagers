const { contextBridge, ipcRenderer } = require('electron');


contextBridge.exposeInMainWorld('dbConnection', {
  checkLogin: (args) => ipcRenderer.invoke('check-login', (args)).then((result) => {
    // console.log(result);
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
  getUsers: () => ipcRenderer.invoke('get-users').then((result) => {
    // console.log(result);
    return result;
  }),
  setUsers: (args) => ipcRenderer.invoke('set-users', (args)).then((result) => {
    // console.log(result);
    return result;
  }),
  getEmployees: () => ipcRenderer.invoke('get-employees').then((result) => {
    // console.log(result);
    return result;
  }),
  getEmployeeIDs: (args) => ipcRenderer.invoke('get-employee-ids', (args)).then((result) => {
    // console.log(result);
    return result;
  }),
  setEmployeeData: (args) => ipcRenderer.invoke('set-employees', (args)).then((result) => {
    // console.log(result);
    return result;
  }),
  getMessages: (args) => ipcRenderer.invoke('get-messages', (args)).then((result) => {
    // console.log(result);
    return result;
  }),
  setLastLogin: (args) => ipcRenderer.invoke('set-last-login', (args)).then((result) => {
    // console.log(result);
    return result;
  }),
  newPassword: (args) => ipcRenderer.invoke('set-new-password', (args)).then((result) => {
    // console.log(result);
    return result;
  })
});

// From main.js
ipcRenderer.on('got-login', () => {
  console.log("logged in.");
});
