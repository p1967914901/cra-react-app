const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = {
  output: {
    filename: 'scripts/[name].[contenthash].js',
  },
  module: {
    rules: [{
      test: /\.css$/i,
      use: [MiniCssExtractPlugin.loader, {
        loader: "css-loader",
        options: {
          modules: true,
        },
      }],
    }, {
      test: /\.less$/i,
      use: [MiniCssExtractPlugin.loader, {
        loader: "css-loader",
        options: {
          modules: true,
        },
      }, 'less-loader'],
    }, {
      test: /\.s[ac]ss$/i,
      use: [MiniCssExtractPlugin.loader, {
        loader: "css-loader",
        options: {
          modules: true,
        },
      }, 'sass-loader'],
    }, ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash].css'
    }),
  ],
  mode: 'production',
  // 优化配置 
  optimization: { 
    minimizer: [
      new CssMinimizerPlugin(), 
    ], 
  },
}