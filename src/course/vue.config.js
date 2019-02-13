module.exports = {
    chainWebpack: config => {
        config.externals({
            'content.js': 'course'
        })
    }
}
