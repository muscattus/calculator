const path = require('path');
// import path from 'path';
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// import MiniCssExtractPlugin from 'mini-css-extract-plugin';
// import HtmlWebpackPlugin from 'html-webpack-plugin';
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['./src/index.js', './src/scss/style.scss'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  mode: 'development',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  devServer: {
    compress: true,
    port: 3200,
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: 'ts-loader',
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
      },
    }),
    new MiniCssExtractPlugin(),
  ],
};