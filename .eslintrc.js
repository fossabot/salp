module.exports = {
    root: true,
    env: {
        node: true,
        mocha: true
    },
    'extends': [
        'plugin:vue/essential',
        '@vue/standard'
    ],
    plugins: [
        'chai-friendly'
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
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
        'no-unused-expressions': ['off'],
        'chai-friendly/no-unused-expressions': ['error'],
        'padding-line-between-statements': [
            'error',
            { blankLine: 'always', prev: '*', next: 'return' }
        ]
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
}
