const path = require('path')

module.exports = {
    chapters: path.resolve(__dirname, 'chapters/'),
    userScript: path.resolve(__dirname, 'main.js'),
    assignments: require('./assignments'),
    docker: {
        images: require('./docker/images')
    }
}
