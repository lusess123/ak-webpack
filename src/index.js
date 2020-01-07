const merge = require('webpack-merge')
const baseConfig = require('./builder')
module.exports = (config = {}, title = 'Demo') => {
     // var args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
     // // console.log("gggggg : "+args)
     // var list = args.slice(0,1)
     // // list.push(baseConfig)
     // return merge.apply(null, [baseConfig].concat(list))
     return merge.smart(baseConfig({title}),config)
}
