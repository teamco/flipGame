const ts = +(new Date);

module.exports = {
  transform: {
    '^.+\\.(js|ts|tsx)?$': require('path').resolve('./__tests__/config/babel.jest')
  },
  'unmockedModulePathPatterns': [
    '<rootDir>/node_modules/react',
    '<rootDir>/node_modules/react-dom'
  ],
  reporters: [
    'default', [
      'jest-html-reporters', {
        'publicPath': `./__report__/${ts}`,
        'filename': 'index.html',
        'openReport': true
      }
    ], [
      'jest-junit', {
        outputDirectory: `./__report__/${ts}/junit/`,
        outputName: 'jest-component.xml',
        ancestorSeparator: ' > ',
        uniqueOutputName: 'false',
        suiteNameTemplate: 'UMI Tests',
        classNameTemplate: '{classname}-{title}',
        titleTemplate: '{title}'
      }
    ]
  ],
  testEnvironment: 'jsdom',
  'testMatch': [
    '**/__tests__/**/*.test.[jt]s?(x)',
    '**/__tests__/**/*.spec.[jt]s?(x)'
  ],
  'collectCoverageFrom': [
    'src/**/*.js',
    'src/components/*.js',
    '!**/node_modules/**',
    '!**/src/**/*.model.js',
    '!**/src/index.js',
    '!**/src/.umi*'
  ],
  'coverageThreshold': {
    'global': {
      'statements': 100,
      'branches': 100,
      'functions': 100,
      'lines': 100
    }
  },
  moduleNameMapper: {
    '\\.(css|less|sass|scss|stylus)$': '<rootDir>/node_modules/identity-obj-proxy/src/index.js',
    '^umi$': require.resolve('umi'),
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@@/(.*)$': '<rootDir>/src/.umi/$1',
    '^__tests__/(.*)': '<rootDir>/__tests__/$1'
  }
};
