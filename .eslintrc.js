module.exports = {
    root: true,
    plugins: [
        'chai-friendly',
        'mocha'
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
        'indent': [
            'error',
            4
        ],
        'new-cap': [
            'error',
            {
                'newIsCapExceptions': [
                    'createLocalVue'
                ]
            }
        ],
        'space-before-function-paren': [
            'error',
            {
                'anonymous': 'never',
                'named': 'never',
                'asyncArrow': 'always'
            }
        ],
        'operator-linebreak': [
            'error',
            'before'
        ],
        'padding-line-between-statements': [
            'error',
            {blankLine: 'always', prev: '*', next: 'return'},
            {blankLine: 'always', prev: '*', next: 'return'}
        ],
        // eslint-plugin-chai-friendly
        // @see https://github.com/ihordiachenko/eslint-plugin-chai-friendly#usage
        'no-unused-expressions': ['off'],
        'chai-friendly/no-unused-expressions': ['error'],
        // eslint-plugin-mocha rules
        // @see https://github.com/lo1tuma/eslint-plugin-mocha/tree/master/docs/rules
        'mocha/no-global-tests': ['error'],
        'mocha/no-nested-tests': ['error'],
        'mocha/valid-test-description': ['error']
    },
    parser: 'babel-eslint'
}
