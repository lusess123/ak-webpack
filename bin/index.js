#!/usr/bin/env node
var process = require('child_process');
var iconv = require('iconv-lite');
var encoding = 'cp936';
var binaryEncoding = 'binary';

process.exec('webpack-dev-server --config node_modules/ak-webpack/src/config.js --mode development',function (error, stdout, stderr) {
  if (error !== null) {
    console.log('exec error: ' + error);
  }
  console.log(iconv.decode(new Buffer(stdout, binaryEncoding), encoding), iconv.decode(new Buffer(stderr, binaryEncoding), encoding));
});

console.log("hello word!")