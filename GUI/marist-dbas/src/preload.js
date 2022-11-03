const { contextBridge } = require('electron');

const dbc = require('./server/db.js');
// let mysql = require('mysql');

contextBridge.exposeInMainWorld('dbConnection', {
  // connect to db here
});
