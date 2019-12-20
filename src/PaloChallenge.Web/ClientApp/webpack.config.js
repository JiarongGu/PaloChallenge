const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// paths
const appPublic = path.resolve(__dirname, './public');
const appSrc = path.resolve(__dirname, './src');
const appOutput = path.resolve(__dirname, './build');

// alias
const alias = {
  '@assets': `${appSrc}/assets`,
  '@containers': `${appSrc}/containers`,
  '@components': `${appSrc}/components`,
  '@decorators': `${appSrc}/decorators`,
  '@models': `${appSrc}/models`,
  '@services': `${appSrc}/services`,
  '@sinks': `${appSrc}/sinks`,
  '@styles': `${appSrc}/styles`,
  '@utils': `${appSrc}/utils`
};

const rules = require('./config/rules')();

module.exports = {
  target: 'web',
  context: appSrc,
  entry: {
    app: ['@babel/polyfill', './index.tsx']
  },
  output: {
    path: appOutput,
    publicPath: '/',
    filename: 'static/js/[name].[hash:8].js',
    chunkFilename: 'static/js/[name].[hash:8].chunk.js'
  },
  resolve: {
    extensions: ['.js', 'jsx', '.json', '.ts', '.tsx'],
    alias
  },
  module: {
    rules
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          test: path.resolve(process.cwd(), 'node_modules'),
          name: 'vendor',
          enforce: true,
          priority: 10
        },
        utils: {
          test: /\.js$/,
          chunks: 'initial',
          name: 'common',
          minSize: 0
        }
      }
    },
    runtimeChunk: {
      name: 'manifest'
    }
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].css',
      chunkFilename: 'static/css/[name].[hash:8].chunk.css'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(appPublic, 'index.html')
    }),
    new CopyWebpackPlugin([{ from: appPublic, to: appOutput }], { ignore: ['index.html'] }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ]
};
