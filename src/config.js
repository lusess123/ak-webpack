const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
  
  devtool: 'eval-source-map',
  entry: {
    app: './test/index.tsx',
  },
  devServer: {
    compress: true,
    historyApiFallback: true,
    open: true,
    historyApiFallback: true,
  },
  module:{
    rules:[
      {
        test: /\.(tsx?|jsx?)$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true
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
      template: './test/views/index.html',
      hash: true,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),]
}