/* eslint-disable */
const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const AssetsPlugin = require('assets-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

const alias = {
  '@': path.resolve(__dirname, './app')
};

console.log('\x1b[33m%s\x1b[0m', 'production', isProd);

/**
 * Plugins for dev environment
 */
const devPlugins = [
  new HtmlWebpackPlugin({
    template: './static/index.html',
    title: 'Bus Booking in Africa'
  }),
  new AssetsPlugin({
    prettyPrint: true,
    filename: 'assets.json',
    path: path.resolve(__dirname, './build')
  }),
  new Dotenv()
];
/**
 * Plugins for production environment
 */
const prodPlugins = [
  new BrotliPlugin({
    asset: '[path].br[query]',
    test: /\.(js|css|html|svg)$/,
    threshold: 10240,
    minRatio: 0.8
  }),
  new UglifyJsPlugin({
    cache: true,
    parallel: true,
    sourceMap: true
  })
];
/**
 * Merging plugins on the basis of env
 */
const pluginList = isProd
  ? [...devPlugins, ...prodPlugins]
  : [...devPlugins, new webpack.HotModuleReplacementPlugin()];

module.exports = {
  // May add cheap-module-source-map to devtool to generate source maps to prod builds
  devtool: isProd ? '' : 'inline-source-map',
  entry: './app/index.js',
  output: {
    filename: isProd ? '[name][chunkhash].js' : '[name].bundle.js',
    path: path.resolve(__dirname, './build'),
    publicPath: isProd ? '/' : '/'
  },
  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(gif|png|svg|jpe?g)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  resolve: { alias },
  plugins: pluginList,
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    },
    runtimeChunk: {
      name: 'manifest'
    }
  },
  devServer: {
    contentBase: path.resolve(__dirname, './build'),
    disableHostCheck: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    historyApiFallback: true,
    host: '127.0.0.1',
    hot: true,
    port: 3000,
    open: true
  }
};
