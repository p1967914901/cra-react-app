const Package = require('../package.json');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const proxy = Package.proxy ?? {} // 获取 package.json 中的 代理配置

module.exports = {
  module: {
    rules: [{
        test: /\.css$/i,
        use: [
          "style-loader", "css-loader"
        ],
      }, {
        test: /\.less$/i,
        use: [
          "style-loader", "css-loader", 'less-loader'
        ],
      }, {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", 'sass-loader'],
      },
    ]
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      async: false
    }),
    new ESLintPlugin({
      extensions: ["js", "jsx", "ts", "tsx"],
    }),
  ],
  devtool: 'eval-cheap-module-source-map',
  mode: 'development',
  devServer: {
    static: '../dist',
    compress: true,
    port: 3000,
    open: true, // 自动打开本地默认浏览器
    hot: true,
    proxy,
    historyApiFallback: true
  }
}