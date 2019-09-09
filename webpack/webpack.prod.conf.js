const os = require('os');
const path = require('path');
const webpack = require('webpack');
const dirs = require('./base/dirs');
const DefaltCSSPlugin = require('./base/cssplugins');
const { extractCSS, extractSass, extractLess } = DefaltCSSPlugin;
const { htmls } = require('./base/pages');
const base = require('./webpack.base.conf');
const HappyPack = require('happypack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const dllManifestOfVendorFrame = require('../lib/frame.manifest.json');
const TerserPlugin = require('terser-webpack-plugin');

const plugins = [];
htmls.map(html => {
  const config = {
    chunks: [html.name],
    chunksSortMode: 'manual',
    template: html.template,
    filename: `${html.name}.html`,
    // favicon: path.resolve(dirs.src, 'favicon.ico'),
    hash: false,
    env: 'prod',
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true
    }
  };
  plugins.push(new HtmlWebpackPlugin(config));
});

const happyPackThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

const config = {
  ...base,

  mode: 'production',

  output: {
    path: dirs.dist,
    publicPath: '/',
    filename: 'js/bundle_[name].[chunkhash].min.js'
  },

  devtool: false,
  optimization: {
    minimizer: [
      new TerserPlugin({
        sourceMap: false, // Must be set to true if using source-maps in production
        terserOptions: {
          compress: {
            drop_console: true
          }
        }
      })
    ]
  },
  plugins: plugins.concat([
    new HappyPack({
      id: 'babel',
      loaders: [
        {
          loader: 'babel-loader',
          options: {
            babelrc: true,
            cacheDirectory: true
          }
        }
      ],
      threadPool: happyPackThreadPool,
      verbose: true
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: dllManifestOfVendorFrame
    }),
    new AddAssetHtmlWebpackPlugin([
      {
        typeOfAsset: 'js',
        includeSourcemap: false,
        filepath: path.resolve(dirs.lib, '**/*.dll.js'),
        publicPath: '/js', // 绝对路径：'/js',
        outputPath: './js'
      }
    ]),
    extractCSS,
    extractSass,
    extractLess,
    new ParallelUglifyPlugin({
      uglifyJs: {
        cacgeDir: '.cache/',
        output: {
          beautify: false,
          commons: false
        },
        compress: {
          warnings: false,
          drop_console: true,
          collapse_vars: true,
          reduce_vars: true
        },
        sourceMap: false
      }
    }),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|css)$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ])
};

module.exports = config;
