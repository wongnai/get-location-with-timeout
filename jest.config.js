module.exports = {
    moduleFileExtensions: ['json', 'ts', 'js'],
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
    testRegex: '((\\.|/)(test|spec))\\.ts$',
    transformIgnorePatterns: ['/node_modules/', '/dist/'],
    testEnvironment: 'jsdom',
    moduleDirectories: ['node_modules', 'src'],
    coverageReporters: ['cobertura', 'lcov', 'json', 'text'],
    coverageThreshold: {
        global: {
            statements: 80,
            branches: 80,
            functions: 80,
            lines: 80,
        },
    },
    collectCoverageFrom: [
        'src/**/*.ts',
        '!src/**/*.d.ts',
        '!src/**/types.ts',
        '!src/**/constants.ts',
        '!src/types/index.ts',
    ],
    testTimeout: 50000,
}