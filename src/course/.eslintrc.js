module.exports = {
    // @see https://vuejs.github.io/eslint-plugin-vue/user-guide/#what-is-the-use-the-latest-vue-eslint-parser-error
    parser: 'vue-eslint-parser',
    'extends': [
        'plugin:vue/essential',
        '@vue/standard',
        '../../.eslintrc.js'
    ],
    parserOptions: {
        parser: 'babel-eslint'
    }
}
