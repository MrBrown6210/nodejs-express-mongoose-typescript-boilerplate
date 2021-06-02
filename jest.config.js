module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // testPathIgnorePatterns: ['tests/integration', 'build'],
  modulePathIgnorePatterns: ['<rootDir>/src/tests/integration', '<rootDir>/build'],
  testEnvironmentOptions: {
    NODE_ENV: 'test',
    APP_ENV: 'test',
  },
  restoreMocks: true,
  coveragePathIgnorePatterns: ['node_modules', 'src/config', 'src/app.ts', 'tests'],
  coverageReporters: ['text', 'lcov', 'clover', 'html'],
}
