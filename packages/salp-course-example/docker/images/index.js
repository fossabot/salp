module.exports = {
    'mysql': {
        image: 'mysql:latest',
        ports: ['3306']
    },
    'wordpress': {
        image: 'wordpress:latest',
        ports: ['80']
    }
}
