// salp course bundle config
const path = require('path')

module.exports = {
    chapters: path.resolve(__dirname, 'chapters/'),
    contentScript: path.resolve(__dirname, 'src/content.js'),
    backgroundScript: path.resolve(__dirname, 'src/background.js'),
    docker: {
        images: {
            'db': {
                image: 'mysql:5.7',
                path: path.resolve(__dirname, 'images/my-database-image.tgz'),
                ports: [
                    3306
                ]
            }
        }
    }
}
