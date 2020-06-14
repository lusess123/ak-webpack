const merge = require('webpack-merge')
const baseConfig = require('./builder')
const path = require('path')
const processPath = process.cwd()
module.exports = (config = {}, title = 'Demo', options = {} ) => {
     return merge.smart(baseConfig({
       title,
        ...options
      }),config)
}
