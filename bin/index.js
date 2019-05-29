#!/usr/bin/env node
var process = require('child_process');
process.exec('webpack-dev-server --config node_modules/ak-webpack/src/config.js --mode development',function (error, stdout, stderr) {
  if (error !== null) {
    console.log('exec error: ' + error);
  }
});

console.log("hello word!")