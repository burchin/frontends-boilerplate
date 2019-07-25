const DefaltCSSPlugin = require('./css');
const { extractCSS, extractSass, extractLess } = DefaltCSSPlugin;
const tsImportPluginFactory = require('ts-import-plugin');
const dirs = require('./dirs');

//postcss
const postcssAspectRatioMini = require('postcss-aspect-ratio-mini');
const postcssPxToViewport = require('postcss-px-to-viewport');
const postcssWriteSvg = require('postcss-write-svg');
const postcssCssnext = require('postcss-cssnext');
const postcssViewportUnits = require('postcss-viewport-units');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');

module.exports = {
  rules: [
    {
      enforce: 'pre',
      test: /\.tsx?$/,
      loader: 'awesome-typescript-loader',
      options: {
        getCustomTransformers: () => ({
          before: [
            tsImportPluginFactory({
              libraryName: 'antd-mobile',
              libraryDirectory: 'lib',
              style: 'css'
            })
          ]
        })
      },
      exclude: /node_modules/,
      include: dirs.src
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
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  overrideBrowserslist: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9' // React doesn't support IE8 anyway
                  ],
                  flexbox: 'no-2009'
                }),
                postcssAspectRatioMini({}),
                postcssPxToViewport({
                  viewportWidth: 750, // (Number) The width of the viewport.
                  viewportHeight: 1334, // (Number) The height of the viewport.
                  unitPrecision: 3, // (Number) The decimal numbers to allow the REM units to grow to.
                  viewportUnit: 'vw', // (String) Expected units.
                  selectorBlackList: ['.ignore', '.hairlines'], // (Array) The selectors to ignore and leave as px.
                  minPixelValue: 1, // (Number) Set the minimum pixel value to replace.
                  mediaQuery: false, // (Boolean) Allow px to be converted in media queries.
                  exclude: /(\/|\\)(node_modules)(\/|\\)/
                }),
                postcssWriteSvg({
                  utf8: false
                }),
                postcssCssnext({ warnForDuplicates: false }),
                postcssViewportUnits({}),
                cssnano({
                  preset: 'advanced',
                  autoprefixer: false,
                  'postcss-zindex': false
                })
              ]
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
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  overrideBrowserslist: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9' // React doesn't support IE8 anyway
                  ],
                  flexbox: 'no-2009'
                }),
                postcssAspectRatioMini({}),
                postcssPxToViewport({
                  viewportWidth: 750, // (Number) The width of the viewport.
                  viewportHeight: 1334, // (Number) The height of the viewport.
                  unitPrecision: 3, // (Number) The decimal numbers to allow the REM units to grow to.
                  viewportUnit: 'vw', // (String) Expected units.
                  selectorBlackList: ['.ignore', '.hairlines'], // (Array) The selectors to ignore and leave as px.
                  minPixelValue: 1, // (Number) Set the minimum pixel value to replace.
                  mediaQuery: false, // (Boolean) Allow px to be converted in media queries.
                  exclude: /(\/|\\)(node_modules)(\/|\\)/
                }),
                postcssWriteSvg({
                  utf8: false
                }),
                postcssCssnext({ warnForDuplicates: false }),
                postcssViewportUnits({}),
                cssnano({
                  preset: 'advanced',
                  autoprefixer: false,
                  'postcss-zindex': false
                })
              ]
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
