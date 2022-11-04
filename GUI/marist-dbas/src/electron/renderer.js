const { ipcRenderer } = require('electron');
import $ from 'jquery';
console.log("loaded");
(function() {
  console.log($);
  $(document);
  console.log("test renderer");
})
