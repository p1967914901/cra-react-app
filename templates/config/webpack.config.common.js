const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // webpack 配置
  // 入口起点
  entry: './src/index.tsx',
  // 输出
  output: {
    // 输出文件名
    filename: 'scripts/[name].[contenthash].js',
    // 输出路径
    path: resolve(__dirname, '../dist'),
    clean: true, // 打包前清理 dist 文件夹
    assetModuleFilename: 'static/[hash][ext][query]'
  },
  // loader 配置
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: 'babel-loader'
      }, {
        test: /\.(png|jpg|jpeg|gif|woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: 'static/[hash][ext][query]'
        },
      },
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.jsx', '.js'], 
  },
  // plugins 的配置
  plugins: [
    // 功能：默认会创建一个空的html文件，自动引入打包输出的所有资源（js/css）
    new HtmlWebpackPlugin({
      // 增加一个配置
      // 复制 './src/index.html' 文件，并自动引入打包输出的所有资源（js/css）
      template: './index.html',
      // 压缩html资源
      // minify: {
      //   collapseWhitespace: true, //去空格
      //   removeComments: true // 去注释
      // }
    }),
  ],
}