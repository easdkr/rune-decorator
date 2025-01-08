module.exports = {
  testEnvironment: "node",
  preset: "ts-jest/presets/default-esm",
  transform: {
    "^.+\\.m?[tj]s?$": ["ts-jest", { useESM: true }],
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(m)?ts$",
  coverageDirectory: "coverage",
  collectCoverageFrom: [
    "src/**/*.ts",
    "src/**/*.mts",
    "!src/**/*.d.ts",
    "!src/**/*.d.mts",
  ],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};
