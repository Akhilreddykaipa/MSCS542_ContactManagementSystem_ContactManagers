const { contextBridge } = require('electron');
let mysql = require('mysql');
const http = require('http');
console.log(http);
console.log(mysql);

console.log("thi si s a contentct test");
console.log("loaded doc");

contextBridge.exposeInMainWorld('dbConnection', {
  // connect to db here
});
