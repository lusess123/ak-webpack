const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const fs = require('fs')
const TerserPlugin = require("terser-webpack-plugin");
const tsImportPluginFactory = require('ts-import-plugin')
const CompressionPlugin = require("compression-webpack-plugin");
const webpack = require('webpack')
console.log('__dirname：', __dirname)
console.log('__filename：', __filename)
console.log('process.cwd()：', process.cwd())
console.log('./：', path.resolve('./'))

const publicPath = path.join(process.cwd(), '/public')
const rootpath = path.dirname(require.main.filename)
console.log('publicPath:',publicPath)
console.log('rootpath:',rootpath)
const processPath = process.cwd()
console.log('processPath:',processPath)

const devMode = process.env.NODE_ENV !== 'production';
console.log(process.env.NODE_ENV)
console.log('是否只允许GET请求', process.env.ONLY_ALLOW_GET)

console.log('parallel:  '+ (process.env.parallel ==='yes' ? undefined : false))
console.log('默认启用https,如果要禁用请覆盖devServer/https:false')
console.log('该默认证书的域名是*.terminus.io')
console.log('默认证书的过期时间是 2029年11月12日 星期一 中国标准时间 下午2:26:52')
console.log(`启用证书请点击${__dirname}/certificate/server.key`)

console.log('mac电脑里，进入 ‘钥匙串访问’ 设置信任证书 ')


module.exports = ({ title, tsImportPluginFactoryOptions = [], alias, tsLoaderInclude = [] }) => {
  return {
  devtool:  process.env.NODE_ENV === 'production' ? 'none':'eval-source-map',
  stats:'minimal',
  entry: {
    app: './test/index.tsx',
  },
  optimization: {
    minimizer: process.env.NODE_ENV === 'production' ? [new TerserPlugin({
      parallel: process.env.parallel ==='yes' ? undefined : false,
      cache:true,
      sourceMap:false
    })] : [],
  },
  output: {
    path: publicPath,
    filename: '[name].js',
    chunkFilename: '[name].[chunkhash].js',
    publicPath: '/',
  },
  devServer: {
    contentBase: path.join(processPath, 'public'),
    compress: true,
    historyApiFallback: true,
    open: true,
    watchOptions: {
      ignored: []
    },
    https: {
      key: fs.readFileSync(path.join(__dirname,'./certificate/server.key')),
      cert: fs.readFileSync(path.join(__dirname,'./certificate/server.crt')),
      ca: fs.readFileSync(path.join(__dirname,'./certificate/ca.csr')),
    },
  },

  resolve: {
    symlinks: false,
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss', '.less', '.json'],
    alias
  },
  module:{
    rules:[
      {
        test: /\.(txt|hbs)$/i,
        use: 'raw-loader',
      },
      {
        test: /\.md$/,
        use: [
            {
                loader: "html-loader"
            },
            {
                loader: "markdown-loader",
                // options: {
                //     /* your options here */
                // }
            }
        ]
      },
      {
        test: /requirejs\/require\.js$/,
        use: ['script-loader'],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /\.(tsx?|jsx?)$/,
        loader: 'ts-loader',
        include: [
          ...tsLoaderInclude,
          path.resolve(processPath,'src'),
          path.resolve(processPath,'config'),
          path.resolve(processPath,'test')
        ],
        options: {
          allowTsInNodeModules: true,
          transpileOnly: true,
          happyPackMode: true,
          getCustomTransformers: () => ({
            before: [tsImportPluginFactory([
              {
                libraryName: 'antd',
                style: true,
              },
              ...tsImportPluginFactoryOptions
            ])],
          }),
        },
      },
      {
        test: /\.(css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          // 'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.scss$/,
        include: [
          path.resolve('./node_modules'),
        ],
        exclude: [
          path.resolve(processPath, 'src'),
          path.resolve(processPath, 'test'),
        ],
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        include: [
          path.resolve(processPath, 'src'),
          path.resolve(processPath, 'test'),
        ],
        exclude: [
          path.resolve(processPath, 'node_modules'),
        ],
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              localIdentName: '[name]_[local]-[hash:base64:5]',
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },

      {
        test: /\.(less)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
              javascriptEnabled: true,
            },
          },
        ],
      },
    ]
  },
  plugins: [
    new CompressionPlugin(),
    new HtmlWebpackPlugin({
      title,
      chunks: ['app'],
      filename: 'index.html',
      template: path.resolve(__dirname, 'index.html'),
      hash: true,
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    }),new webpack.DefinePlugin({
      "process.sysenv": {
          "ONLY_ALLOW_GET":  process.env.ONLY_ALLOW_GET ? JSON.stringify(true) : JSON.stringify(false)
      }
    })]
}}
