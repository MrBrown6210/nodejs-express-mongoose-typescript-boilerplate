module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: '/integration/',
  testEnvironmentOptions: {
    NODE_ENV: 'test',
  },
  restoreMocks: true,
  coveragePathIgnorePatterns: ['node_modules', 'src/config', 'src/app.js', 'tests'],
  coverageReporters: ['text', 'lcov', 'clover', 'html'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },
}
