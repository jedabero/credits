import type { JestConfigWithTsJest } from 'ts-jest';

const jestConfig: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper:{
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  },
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  coveragePathIgnorePatterns: ['src/main.tsx', 'src/vite-env.d.ts'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  setupFilesAfterEnv: ["<rootDir>/__tests_helpers__/setupTests.ts"],
}

export default jestConfig;
