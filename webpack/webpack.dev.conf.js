const os = require('os');
const webpack = require('webpack');
const dirs = require('./base/dirs');
const { htmls } = require('./base/pages');
const DefaltCSSPlugin = require('./base/css');
const { extractCSS, extractSass, extractLess } = DefaltCSSPlugin;
const base = require('./webpack.base.conf');
const HappyPack = require('happypack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const plugins = [];
htmls.forEach(html => {
  const config = {
    chunks: [html.name],
    chunksSortMode: 'manual',
    template: html.template,
    filename: `${html.name}.html`,
    // favicon: path.resolve(dirs.src, 'favicon.ico'),
    hash: false,
    env: 'dev',
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

  mode: 'development',

  output: {
    path: dirs.dist,
    publicPath: '/',
    filename: 'js/bundle_[name].js'
  },

  devtool: '#cheap-module-eval-source-map',

  plugins: plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
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
    extractCSS,
    extractSass,
    extractLess
  ]),

  devServer: {
    hot: true,
    inline: true,
    overlay: {
      warnings: true,
      errors: true
    },
    // https: true,
    historyApiFallback: true,
    // historyApiFallback: {}, // 对于多个单页应用需要专门配置
    // contentBase: path.resolve(dirs.src, 'hotDist')
    contentBase: dirs.dist
  }
};

module.exports = config;
