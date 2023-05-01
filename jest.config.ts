import type { JestConfigWithTsJest } from 'ts-jest';

const jestConfig: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper:{
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  },
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
}

export default jestConfig;
