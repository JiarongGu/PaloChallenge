const path = require('path');

const merge = require('webpack-merge');
const baseConfig = require('./webpack.config');


// paths
const appOutput = path.resolve(__dirname, './build');

module.exports = merge.smart(baseConfig, {
  devServer: {
    hot: true,
    port: 4200,
    contentBase: appOutput,
    publicPath: '/',
    historyApiFallback: {
      verbose: true,
      disableDotRule: false
    },
    proxy: {
      '/api': 'http://localhost:5000' 
    }
  }
});
