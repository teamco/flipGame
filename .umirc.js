import { defineConfig } from '@umijs/max';

import { proxy } from './config/proxy';
import { routes } from './config/routes';
import { theme } from './config/theme';
import { alias } from './config/alias';

const {
  DEBUG = true,
  NODE_ENV = 'development'
} = process.env;

const isDevelopment = NODE_ENV === 'development';

const minifier = isDevelopment ? {} : {
  jsMinifier: 'esbuild',
  jsMinifierOptions: {
    minifyWhitespace: true,
    minifyIdentifiers: true,
    minifySyntax: true
  }
};

const shared = {
  react: {
    singleton: true,
    eager: true
  },
  'react-dom': {
    singleton: true,
    eager: true
  }
};

/**
 * @constant
 * @type {ConfigType|*}
 * @private
 */
const __config__ = {
  crossorigin: true,
  alias,
  routes,
  proxy,
  model: {},
  base: '/flip-cards',
  antd: {
    configProvider: {},
    theme
  },
  request: {
    dataField: 'data'
  },
  initialState: {},
  esbuildMinifyIIFE: true,
  codeSplitting: {
    jsStrategy: 'granularChunks'
  },
  mock: {
    include: ['mock/*.mock.js']
  },
  manifest: {},
  favicons: [
    '/assets/favicon.png',
    // '/assets/favicon-16x16.png',
    // '/assets/favicon-32x32.png'
  ],
  locale: {
    default: 'en-US',
    antd: true,
    title: true,
    baseNavigator: false,
    baseSeparator: '-'
  },
  define: {
    DEBUG,
    NODE_ENV
  },
  // devtool: NODE_ENV === 'development' ? 'eval' : false,
  ...minifier,
  // clickToComponent: {},
  fastRefresh: true,
  dva: {
    immer: {},
    extraModels: []
  },
  mfsu: {
    // esbuild: true
    mfName: 'local',
    remoteName: 'remote',
    shared
  },
  lessLoader: {
    lessLoaderOptions: {}
  },
  deadCode: {},
  extraBabelPlugins: [],
  headScripts: [],
  links: [],
  metas: [],
  plugins: [
    'umi-plugin-circular-check'
  ]
};

if (isDevelopment) {
  console.log('\n\n==== CONFIG =====\n');
  console.log(__config__);
  console.log('\n==== /CONFIG =====\n\n');
}

export default defineConfig(__config__);
