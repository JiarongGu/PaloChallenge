const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const tsRule = {
  test: /\.(ts|tsx)$/,
  use: ['babel-loader', 'ts-loader'],
  exclude: /node_modules/
};

const sassRegex = /\.s[ac]ss$/i;
const sassModuleRegex = /\.module\.s[ac]ss$/i;

const lessModuleRule = {
  test: sassRegex,
  loaders: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: process.env.NODE_ENV === 'development'
      }
    },
    'css-hot-loader',
    'css-loader',
    'postcss-loader',
    {
      loader: 'sass-loader',
      options: {
        implementation: require('sass'),
        sassOptions: {
          includePaths: ['./src/styles'],
        },
      }
    }
  ],
  exclude: sassModuleRegex
};

const lessRule = {
  test: sassModuleRegex,
  loaders: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: process.env.NODE_ENV === 'development'
      }
    },
    'css-hot-loader',
    'css-type-loader',
    {
      loader: 'css-loader',
      options: {
        modules: {
          localIdentName: '[name]__[local]__[hash:base64:5]'
        },
        localsConvention: 'camelCase',
        sourceMap: true,
        importLoaders: 1
      }
    },
    'postcss-loader',
    {
      loader: 'sass-loader',
      options: {
        implementation: require('sass'),
        sassOptions: {
          includePaths: ['./src/styles'],
        },
      }
    }
  ]
};

const cssRule = {
  test: /\.css$/,
  loaders: [
    {
      loader: MiniCssExtractPlugin.loader
    },
    'css-loader',
    'postcss-loader'
  ]
};

const fileRule = {
  test: /\.(png|jpg|gif|svg)$/i,
  use: [
    {
      loader: "url-loader",
      options: {
        limit: false,
        name: "assets/[hash].[ext]"
      }
    }
  ]
};

module.exports = function() {
  return [tsRule, lessModuleRule, lessRule, cssRule, fileRule];
};
