#!/usr/bin/env node
var process = require('child_process');
var iconv = require('iconv-lite');
var encoding = 'cp936';
var binaryEncoding = 'binary';

const ddd = process.exec('webpack-dev-server --config node_modules/ak-webpack/src/config.js --mode development',function (error, stdout, stderr) {
  if (error !== null) {
    console.log('exec error: ' + error);
  }
  console.log(iconv.decode(new Buffer(stdout, binaryEncoding), encoding), iconv.decode(new Buffer(stderr, binaryEncoding), encoding));
});

ddd.stdout.on('data', (d)=> {
    console.log(d)
})

ddd.stderr.on('data', (d) => {
  console.log(d)
})

console.log("==================开始启动编译=================")