module.exports = {
  presets: [
    '@vue/app'
  ],
  plugins: [
    'lodash'
  ],
  env: {
    'test': {
      plugins: [
        'rewire'
      ]
    }
  }
}
