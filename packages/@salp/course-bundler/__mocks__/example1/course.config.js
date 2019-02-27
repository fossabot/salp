// salp course bundle config
const path = require('path')

module.exports = {
    chapters: path.resolve(__dirname, 'chapters/'),
    userScript: path.resolve(__dirname, 'src/user.js'),
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
