//postcss
const postcssAspectRatioMini = require('postcss-aspect-ratio-mini');
const postcssPxToViewport = require('postcss-px-to-viewport');
const postcssWriteSvg = require('postcss-write-svg');
const postcssCssnext = require('postcss-cssnext');
const postcssViewportUnits = require('postcss-viewport-units');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');

const postcssPlugins = () => [
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
];

module.exports = {
  postcssPlugins
};
