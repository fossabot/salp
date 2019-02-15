module.exports = {
    filenameHashing: false,
    chainWebpack: config => {
        config.externals({
            'content.js': 'course'
        })
    }
}
