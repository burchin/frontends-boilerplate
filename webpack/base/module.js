const DefaltCSSPlugin = require('./cssplugins');
const { extractCSS, extractSass, extractLess } = DefaltCSSPlugin;
const { postcssPlugins } = require('./postcss');

module.exports = {
  rules: [
    {
      test: /\.tsx?$/,
      exclude: /node_modules/,
      use: 'happypack/loader?id=babel'
    },
    {
      test: /\.(json|conf)$/,
      exclude: /node_modules/,
      loader: 'json-loader'
    },
    {
      test: /\.css$/,
      use: extractCSS.extract({
        fallback: 'style-loader',
        use: ['css-loader']
      })
    },
    {
      test: /\.scss$/,
      use: extractSass.extract({
        fallback: 'style-loader',
        use: [
          'css-loader?importLoaders=1&modules&localIdentName=[local]__[name]-[hash:base64:8]',
          {
            loader: require.resolve('postcss-loader'),
            options: {
              // Necessary for external CSS imports to work
              // https://github.com/facebookincubator/create-react-app/issues/2677
              ident: 'postcss',
              plugins: postcssPlugins
            }
          },
          'sass-loader'
        ]
      })
    },
    {
      test: /\.less$/,
      use: extractLess.extract({
        fallback: 'style-loader',
        use: [
          'css-loader',
          {
            loader: require.resolve('postcss-loader'),
            options: {
              // Necessary for external CSS imports to work
              // https://github.com/facebookincubator/create-react-app/issues/2677
              ident: 'postcss',
              plugins: postcssPlugins
            }
          },
          'less-loader?javascriptEnabled=true'
        ]
      })
    },
    {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 5000,
            name: 'images/[path]/[name].[ext]'
          }
        }
      ]
    }
  ]
};
