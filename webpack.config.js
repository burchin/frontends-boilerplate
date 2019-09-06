const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = (env, argv) => {
  const config = argv && argv.host ? require('./webpack/webpack.dev.conf') : require('./webpack/webpack.prod.conf');

  if (config && config.plugins && Array.isArray(config.plugins)) {
    const API_ENV = env || (argv && argv.host ? 'dev' : 'prod');

    config.plugins.push(new webpack.DefinePlugin({
      'process.env.API_ENV': JSON.stringify(API_ENV), // 这里不需要去定义 process.env.NODE_ENV，交给 CLI -p 和 webpack mode 去自动设置
    }));

    if (argv && argv.anal) { // --anal=1 输出包的体积分析
      config.plugins.push(new BundleAnalyzerPlugin({
        analyzerPort: 8088,
        openAnalyzer: false,
      }));
    }
  }

  return config;
};