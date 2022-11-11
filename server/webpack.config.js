const path = require('path');

module.exports = {
  entry: ['./src/server.ts'],
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
    port: 3500,
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: 'ts-loader',
      },
    ],
  },
};