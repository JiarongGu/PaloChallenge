const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: { 
    ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/src/' }),
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|sass|scss)$": "<rootDir>/__mocks__/styleMock.js"
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js']
};
