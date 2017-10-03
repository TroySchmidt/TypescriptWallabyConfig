module.exports = function (wallaby) {
  return {
    files: [
      'src/**/*.+(ts*|js*|css|svg)',
      '!src/**/*.test.js*',
      '!src/**/*.test.ts*',
      '!src/registerServiceWorker.ts',
      '!src/react-split-pane/**/*.*'
    ],

    tests: ['src/**/*.test.js*','src/**/*.test.ts*'],

    env: {
      type: 'node',
      runner: 'node'
    },

    compilers: {
      '**/*.ts?(x)': wallaby.compilers.typeScript(require('./tsconfig.test.json').compilerOptions)
    },

    setup: (wallaby) => {
      const jestConfig = require('./package.json').jest;
      delete jestConfig.testEnvironment;
      wallaby.testFramework.configure(jestConfig);
    },

    testFramework: 'jest',

    workers: {
      initial: 3,
      regular: 3
    },

    filesWithNoCoverageCalculated: ['src/modules/**/layout.js*', 'src/index.js', 'src/**/__mocks__/*'],

    hints: {
        ignoreCoverage: /ignore coverage/
    }
  };
};