/** @type {import('jest').Config} */
export default {
  verbose: true,
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { isolatedModules: true }],
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "^~/(.+)": "<rootDir>/src/$1",
  },
  modulePathIgnorePatterns: [
    "<rootDir>/__tests__/mocks/"  // Caminho para a pasta de mocks que você quer ignorar
  ],

//   setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
};
