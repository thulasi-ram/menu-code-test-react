/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    testPathIgnorePatterns: ['<rootDir>/node_modules', '<rootDir>/dist'],
    moduleDirectories: ['<rootDir>/node_modules', '<rootDir>/src'],
    setupFilesAfterEnv: ['<rootDir>/src/jest-setup.ts'],

};
