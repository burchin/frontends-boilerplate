const base = require('./webpack-config/webpack.base.config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const plugins = require('./webpack-config/plugins.prod.config')
const dirs = require('./webpack-config/base/dir-vars.config');
//postcss 
const postcssAspectRatioMini = require('postcss-aspect-ratio-mini'); 
const postcssPxToViewport = require('postcss-px-to-viewport'); 
const postcssWriteSvg = require('postcss-write-svg'); 
const postcssCssnext = require('postcss-cssnext'); 
const postcssViewportUnits = require('postcss-viewport-units'); 
const cssnano = require('cssnano'); 
const autoprefixer = require('autoprefixer'); 

const config = {
    ...base,
    mode: 'production',
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader'
                    }]
                })
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 5000,
                            name: 'images/[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                include: dirs.srcDir,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                module: true
                            }
                        },
                        {
                            loader: require.resolve('postcss-loader'), 
                            options: { 
                              // Necessary for external CSS imports to work 
                              // https://github.com/facebookincubator/create-react-app/issues/2677 
                              ident: 'postcss', 
                              plugins: () => [ 
                                require('postcss-flexbugs-fixes'), 
                                autoprefixer({ 
                                  browsers: [ 
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
                        {
                            loader: 'sass-loader'
                        }
                    ]
                })
            },
            { 
                test: /\.less$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                module: true
                            }
                        },
                        {
                            loader: 'less-loader',
                            options: { 
                                'javascriptEnabled': true,
                                'modifyVars': {
                                    'brand-primary': '#ff2740'
                                }
                            }
                        }
                    ]
                })
            }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'common',
                    chunks: 'all'
                }
            }
        }
    },
    plugins: plugins
};

module.exports = config
