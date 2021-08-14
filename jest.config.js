require('./config/env');

let coverageReporters = ['lcov', 'text', 'json', 'clover'];

if (!process.env.CI) {
  coverageReporters = ['html-spa'];
}

module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters,
  resolver: require.resolve('jest-pnp-resolver'),
  testURL: 'http://localhost',
  preset: 'ts-jest',
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
  },

  testMatch: [
    // '<rootDir>/test/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/test/**/*.{js,jsx,ts,tsx}',
  ],

  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/*.d.ts'],

  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$',
    '^.+\\.module\\.(css|sass|scss|styl)$',
  ],
  moduleNameMapper: {},
  moduleFileExtensions: ['js', 'ts', 'json'],
};
