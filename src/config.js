const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const tsImportPluginFactory = require('ts-import-plugin')
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

module.exports = {
  devtool: 'eval-source-map',

  entry: {
    app: './test/index.tsx',
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
    }
  },
  resolve: {
    symlinks: false,
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss', '.less'],
    modules: [
      'src',
      'node_modules/@terminus',
      'node_modules',
    ],
  },
  module:{
    rules:[
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
          path.resolve(processPath,'node_modules/@terminus'),
          path.resolve(processPath,'src'),
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
              {
                libraryName: '@terminus/nusi',
                libraryDirectory: 'es',
              },
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
    new HtmlWebpackPlugin({
      chunks: ['app'],
      filename: 'index.html',
      template:  path.join(__dirname, 'index.html'),
      hash: true,
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    }),]
}
